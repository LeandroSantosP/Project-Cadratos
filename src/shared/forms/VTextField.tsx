import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react";

type TTextFieldProps = TextFieldProps & {
   name: string;
}

export const VTextField: React.FC<TTextFieldProps> = ({ name, ...rest }) => {
   const { fieldName, registerField, defaultValue, clearError, error } = useField(name);
   const [ value, setValue ] = useState(defaultValue || '');

   
   useEffect(() => {
      registerField({
         name: fieldName,
         getValue: () => value,
         setValue: (_, value) => setValue(value),
      })
   }, [registerField, fieldName, value]);


   return(
      <TextField 
         {...rest}

         error={!!error}
         helperText={error}
         value={value}
         defaultValue={defaultValue}

         onChange={(e) => {setValue(e.target.value); rest.onChange?.(e);}}

         onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e);}}
      />
   )

}