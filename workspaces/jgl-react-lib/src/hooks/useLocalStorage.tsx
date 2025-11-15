import { LocalStorage } from "../models/localStorage.models";

// Define a custom hook type similar to React.FC
type UseLocalStorageHook = () => {
    setOrUpdateLocalStorage: <T>(key: string, data: T, expiresInMinutes?: number) => void,
    tryGetLocalStorage: <T>(key: string) => T | null
};

export const useLocalStorage: UseLocalStorageHook = () => {
  
    const setOrUpdateLocalStorage = <T,>(key: string, data: T, expiresInMinutes : number = 1440 ) => {
      const createdAt = Date.now();
      
      const expiresIn = createdAt + expiresInMinutes * 1000;
  
      const stringifyJson =  JSON.stringify({createdAt, data, expiresIn} as LocalStorage<T>);
      localStorage.setItem(key, stringifyJson);
    }
  
    const tryGetLocalStorage = <T,>(key:string) : T | null => {    
      
      const stringifyJson = localStorage.getItem(key);

      if(stringifyJson == null) return null;
      const respone = JSON.parse(stringifyJson) as LocalStorage<T>;

      if(!isLocalStorageValid(key,respone)) return null;
  
      return respone.data;
    }
  
    const isLocalStorageValid = <T,>(key: string, data: LocalStorage<T>) => {
      const isValid = data.expiresIn > Date.now() ;
      if(!isValid){
        localStorage.removeItem(key);
      }
      return isValid;
    }
  
    return { setOrUpdateLocalStorage, tryGetLocalStorage };
}