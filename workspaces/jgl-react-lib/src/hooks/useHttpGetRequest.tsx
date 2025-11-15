import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export interface useHttpGetRequestProps<T> {
    request$: () => Observable<T>;
    behaivourLevel: 'content' | 'page';
}
1
export const useHttpGetRequest = <T,>({ request$ }: useHttpGetRequestProps<T>) => {
    const [responseData, setResponseData] = useState<T | null>();

    useEffect(() => {
        request$()
            .subscribe({
                next: ((response: T) => {
                    setResponseData(response);
                })
            });
    }, []);

    return responseData;
}
