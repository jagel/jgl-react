import { useContext } from "react";
import { JglUserSessionContext } from "../app-contexts/user-session-context/index";

export const useValidateUserRole = (rolesAllowed : Array<string>) : boolean => {
    const userSessionContext = useContext(JglUserSessionContext);
    var claims : string[] = userSessionContext.getAccessData().roles ?? [];

    const rolesMatched = rolesAllowed.filter(roleAllowed => claims.includes(roleAllowed));
    const authorized = rolesMatched.length > 0;
    return authorized;
}