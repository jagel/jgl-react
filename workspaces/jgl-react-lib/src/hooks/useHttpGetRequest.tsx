import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export interface useHttpGetRequestProps<T> {
    request$: () => Observable<T>;
    behaivourLevel: 'content' | 'page';
}
const useHttpGetRequest = <T,>({ request$ }: useHttpGetRequestProps<T>) => {
    const [responseData, setResponseData] = useState<T | null>();

    useEffect(() => {
        const subscription = request$()
            .subscribe({
                next: ((response: T) => {
                    setResponseData(response);
                })
            });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return responseData;
}

export default useHttpGetRequest;