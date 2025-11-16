// #region Imports

// React
import { useState } from "react";

// JGL libraries
import { EContextService, EContextTierStatus, ContextTier, ContextTierMessage } from "./init-tier.definitions";

// #endregion Imports


export const useInitTier = (serviceTier: Array<EContextService> = []) : [ContextTierMessage, (initTier : ContextTier) => void ] => {

    //#region Initializations
    const [initTier, setInitTier] = useState<ContextTierMessage>({
        globalStatus: EContextTierStatus.loading,
        contextsStatus : serviceTier.map((stier, index)=> index === 0 ? 
            { service: stier, status: EContextTierStatus.init } : 
            { service: stier, status: EContextTierStatus.queued} 
        )
    });
    //#endregion Initializations

    //#region Methods
    const updateInitTier = function(tierChanged : ContextTier) {
        const index =  serviceTier.findIndex(x=> x == tierChanged.service);
        const isLastTier = index === (serviceTier.length -1);
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

        const setGlobalSatus = () : EContextTierStatus => {
            if(failed){
                return EContextTierStatus.failed;
            }
            if(isLastTier && tierChanged.status === EContextTierStatus.completed){
                return EContextTierStatus.completed;
            }
            return EContextTierStatus.loading;
        }

        setInitTier(prev => ({...prev, globalStatus: setGlobalSatus(), contextsStatus : prev.contextsStatus.map(setTier)}));
    }
    //#endregion Methods
    
    return [initTier, updateInitTier];
}