import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
   const FormRef = useRef<FormHandles>(null);

   const IsSavingAndNew= useRef(false); 
   const IsSavingAndClose = useRef(false); 

   const handleSave = useCallback(() => {
      IsSavingAndNew.current = false;
      IsSavingAndClose.current = false;
      FormRef.current?.submitForm();
   }, []);

   const handleSaveAndNew = useCallback(() => {
      IsSavingAndClose.current = false;
      IsSavingAndNew.current = true;
      FormRef.current?.submitForm();
   }, []);

   const handleSaveAndClose = useCallback(() => {
      IsSavingAndClose.current = true;
      IsSavingAndNew.current = false;
      FormRef.current?.submitForm();
   }, []);


   return {
      FormRef,

      save: handleSave,
      saveAndNew: handleSaveAndNew,
      saveAndClose: handleSaveAndClose,

      IsSaveAndNew: IsSavingAndNew,
      IsSaveAndClose: IsSavingAndClose,
   };
};