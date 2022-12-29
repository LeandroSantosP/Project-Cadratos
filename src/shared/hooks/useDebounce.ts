import { useCallback, useRef } from "react";



export const useDebounce = (delay = 300, notDelayInFristTime = true ) => {

   const isFristTime = useRef<boolean>(notDelayInFristTime);
   const debouncing = useRef<NodeJS.Timeout>();

   const debounce = useCallback((func: () => void) => {

      if (isFristTime.current) {
         isFristTime.current = false;
         func();
      } else {
         if (debouncing.current) {
            clearTimeout(debouncing.current);
         }
         debouncing.current = setTimeout(() => func(), delay);
      }

   }, [delay]);

   return { debounce };
}