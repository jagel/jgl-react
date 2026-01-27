import { useParams } from "react-router-dom";

export const useNumberIdRouteParams = (keyName:string) => {
    const params = useParams();
    var keyvalue = params[keyName];

    var intKeyValue = parseInt(keyvalue??"");
    return intKeyValue;
}