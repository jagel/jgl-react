import { useContext } from "react";
import { JglUserSessionContext } from "../app-contexts";

export const useValidateUserRole = (rolesAllowed : Array<string>) : boolean => {
    const userSessionContext = useContext(JglUserSessionContext);
    var claims : string[] = userSessionContext.appData?.userProfile.accessClaims ?? [];

    const rolesMatched = rolesAllowed.filter(rolleAllowed => claims.includes(rolleAllowed));
    const authorized = rolesMatched.length > 0;
    return authorized;
}