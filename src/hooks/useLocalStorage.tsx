import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue?:any) => {
  // method read value of local
  const readValue = useCallback(() => {
    if (window === undefined) {
      console.warn(
        "object window is undefined and con not to the access localstorage"
      );
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`setting localstorage went wrong => ${error}`);
      return initialValue;
    }
  }, [initialValue, key]);

  // state value local
  const [storedValue, setStoredValue] = useState(readValue);

  // method set value in local
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`error to set value in local => ${error}`);
    }
  };

  useEffect(() => {
    setStoredValue(readValue())
    console.log(readValue());
  }, [readValue,storedValue])

  return { storedValue, setValue };
};
export default useLocalStorage;
// import { Dispatch, SetStateAction, useEffect, useState } from "react";

// type ReturnType<T> = {
//   storedValue: T | undefined;
//   setValue: Dispatch<SetStateAction<T | undefined>>;
// };

// const useLocalStorage = <T,>(key: string, initialValue?: T): ReturnType<T> => {
//   const [storedValue, setStoredValue] = useState<T | undefined>(() => {
//     if (!initialValue) return;
//     try {
//       const value = localStorage.getItem(key);
//       return value ? JSON.parse(value) : initialValue;
//     } catch (error) {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     if (storedValue) {
//       try {
//         localStorage.setItem(key, JSON.stringify(storedValue));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }, [storedValue, key]);

//   return { storedValue, setValue: setStoredValue };
// };
// export default useLocalStorage;
