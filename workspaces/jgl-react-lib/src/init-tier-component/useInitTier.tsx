// #region Imports

// React
import { useEffect, useState } from "react";
import { concat, map, Observable } from "rxjs";

// JGL libraries
import { EContextService, EContextTierStatus, ContextTier, ContextTierMessage, InitTierInfo } from "./init-tier.definitions";

// #endregion Imports

// #region Definitions
export interface UseInitTierProps {
    service: EContextService;
    getData$ : () => Observable<void>;
}
// #endregion Definitions

/**
 * Hook to initialize context tiers
 * @param contextsTiers - Array of UseInitTierProps defining the context tiers to initialize
 * @returns A tuple containing the ContextTierMessage and InitTierInfo
 */
export const useInitTier = (
    contextsTiers : UseInitTierProps[]
) : [
    ContextTierMessage,
    InitTierInfo
] => {

    //#region Initializations
    const [initTier, setInitTier] = useState<ContextTierMessage>({
        globalStatus: EContextTierStatus.loading,
        contextsStatus : contextsTiers.map((stier, index)=> index === 0 ? 
            { service: stier.service, status: EContextTierStatus.init } : 
            { service: stier.service, status: EContextTierStatus.queued} 
        )
    });

    const [tierInfo, setTierInfo] = useState<InitTierInfo>({
        loadingPercentage: 0,
        totalServices: contextsTiers.length,
        completedServices: 0
    } as InitTierInfo);
    //#endregion Initializations

    // Load context data requests
    useEffect(() => {
        const requests : Array<Observable<EContextService>> = contextsTiers.map(tier =>  tier.getData$().pipe(map(() => tier.service) ));

        const sub = concat(...requests).subscribe({
            next: (tierServiceCompleted) => {
                const foundTier = initTier.contextsStatus.find(ct => ct.service === tierServiceCompleted);
                if (foundTier) {
                    updateInitTier(foundTier);
                } else {
                    console.warn(`No matching context tier found for service: ${tierServiceCompleted}`);
                }

                setTierInfo(prev => ({
                    ...prev,
                    loadingPercentage: Math.min(100, Math.round(((prev.completedServices + 1) / prev.totalServices) * 10000) / 100),
                    completedServices: prev.completedServices + 1,
                }) );
            },
            complete: () => {
                setTierInfo(prev => ({...prev, loadingPercentage: 100, completedServices: prev.totalServices}) );
                
                // Finalize global status as completed, delayed to ensure UI updates
                setTimeout(() => {
                    setInitTier(prev => ({...prev, globalStatus: EContextTierStatus.completed}));
                }, 150);
            },
            error: (error) => {
                setInitTier(prev => ({...prev, globalStatus: EContextTierStatus.failed}));
                const failedTier = initTier.contextsStatus
                    .find(ct => ct.status === EContextTierStatus.init || ct.status === EContextTierStatus.loading) ?? {} as ContextTier;
                updateInitTier({...failedTier, status: EContextTierStatus.failed});
                console.error('Error initializing context tiers:', error);
            }
        });
       

        return () => sub.unsubscribe();
    }, []);

    //#region Methods
    const updateInitTier = function(tierChanged : ContextTier) {
        const index =  contextsTiers.findIndex(x=> x.service === tierChanged.service);
        const isLastTier = index === (contextsTiers.length -1);
        const failed = tierChanged.status === EContextTierStatus.failed;
        
        const setTier = (tier: ContextTier, tierIndex:number) => {            
            // Update the tier that changed or keep the same if initializing
            if(tier.service === tierChanged.service || tierChanged.status === EContextTierStatus.init){
                return tierChanged;
            }
            // If the previous tier is completed, set the next tier to init
            if(!failed && tierIndex === (index + 1) && tierChanged.status === EContextTierStatus.completed){
                return { ...tier, status: EContextTierStatus.init };
            }
            return tier;
        }

        const setGlobalStatus = () : EContextTierStatus => {
            if(failed){
                return EContextTierStatus.failed;
            }
            if(isLastTier && tierChanged.status === EContextTierStatus.completed){
                return EContextTierStatus.completed;
            }
            return EContextTierStatus.loading;
        }

        setInitTier(prev => ({...prev, globalStatus: setGlobalStatus(), contextsStatus : prev.contextsStatus.map(setTier)}));
    }
    //#endregion Methods
    
    return [initTier,tierInfo];
}



