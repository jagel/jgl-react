import { useEffect, useState } from "react";
import { EContextTierStatus, InitTierContextProps } from "./init-tier.definitions";

const InitContextTier : React.FC<InitTierContextProps> = ({
    loadingComponent,
    errorComponent,
    onTierChange,
    children
}) => {

    const [percentage, setPercentage] = useState<number>(0);
    useEffect(() => {
        var total = onTierChange.contextsStatus.length;
        let percentage = 100;
        if(total>0){
            var loadingCount = onTierChange.contextsStatus.filter(x=>x.status === EContextTierStatus.loading || x.status === EContextTierStatus.init || x.status === EContextTierStatus.queued).length;
            percentage = ((total - loadingCount)/total) * 100;
        }
        setPercentage(percentage);
    },[onTierChange]);

    switch(onTierChange.globalStatus){
        case EContextTierStatus.queued:
        case EContextTierStatus.init:
        case EContextTierStatus.loading:
            return loadingComponent({contextTier: onTierChange, percentageCompleted: percentage});
        case EContextTierStatus.completed:
            return children;
        case EContextTierStatus.failed:
            return errorComponent({contextTier: onTierChange, percentageCompleted: percentage});
        default:
            return errorComponent({contextTier: onTierChange, percentageCompleted: percentage});
    }
}

export default InitContextTier;