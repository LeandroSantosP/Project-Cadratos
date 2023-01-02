import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useDebounce } from "../../hooks";
import { CidadesServices } from "../../services/api/Cidades/CidadesServices";

type TAutoCompleteOption = {
   id: number;
   label: string;
};

interface IAutoCompleteCidadeProps {
   isExternalLoading?: boolean;
}


export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
   isExternalLoading = false,
}) => {
   const { fieldName, registerField, defaultValue, error, clearError } =
      useField("cityId");
   const { debounce } = useDebounce();

   const [selectedId, setSelectedId] = useState<number | undefined>(
      defaultValue
   );

   const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [busca, setBusca] = useState("");

   useEffect(() => {
      registerField({
         name: fieldName,
         getValue: () => selectedId,
         setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
      });
   }, [registerField, fieldName, selectedId]);

   useEffect(() => {
      setIsLoading(true);

      debounce(() => {
         CidadesServices.getAll(1, busca).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
               alert(result.message);
            } else {
               console.log(result);

               setOpcoes(
                  result.data.map((cidade) => ({ id: cidade.id, label: cidade.name }))
               );
            }
         });
      });
   }, [busca]);

   const autoCompleteSelectedOption = useMemo(() => {
      if (!selectedId) return null;

      const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
      if (!selectedOption) return null;

      return selectedOption;
   }, [selectedId, opcoes]);

   return (
      <Autocomplete
         openText="Abrir"
         closeText="Fechar"
         noOptionsText="Sem opções"
         loadingText="Carregando..."
         disablePortal
         
         options={opcoes}
         loading={isLoading}
         disabled={isExternalLoading}
         value={autoCompleteSelectedOption}
         onInputChange={(_, newValue) => setBusca(newValue)}
         onChange={(_, newValue) => {
            setSelectedId(newValue?.id);
            setBusca("");
            clearError();
         }}
         popupIcon={
            isExternalLoading || isLoading ? (
               <CircularProgress size={28} />
            ) : undefined
         }
         renderInput={(params) => (
            <TextField
               {...params}
               label="Cidade"
               error={!!error}
               helperText={error}
            />
         )}
      />
   );
};

// interface AutoCompleteOption {
//    label: string;
//    id: number;
// }

// interface AutoCompleteCidadeProps {
//    isExternalLoading?: boolean;
// }

// export const AutoCompleteCidade: React.FC<AutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
//    const { fieldName, registerField, defaultValue, error, clearError } = useField('cityId');
//    const [selecedId, setSelectedId] = useState<number | undefined>(defaultValue);

//    const [options, setOptions] = useState<AutoCompleteOption[]>([]);
//    const [IsLoading, setIsLoading] = useState(false);
//    const [search, setSearch] = useState('');
//    const { debounce } = useDebounce();
//    console.log(options)
//    useEffect(() => {
//       registerField({
//          name: fieldName,
//          getValue: () => selecedId,
//          setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
//       });

//    }, [registerField, fieldName, setSelectedId])

//    useEffect(() => {
//       setIsLoading(true);

//       debounce(() => {
//          CidadesServices.getAll(1, search)
//             .then(response => {
//                setIsLoading(false);
//                if (response instanceof Error) {
//                   /*  alert(response.message); */
//                } else {
//                   setOptions(response.data.map(city => ({ id: city.id, label: city.name })));
//                }
//             })
//       });

//    }, [search]);

//    const autoCompleteSelectedOptions = useMemo(() => {

//       if (!selecedId) return null;

//       const selectedOption = options.find(opcao => opcao.id === selecedId);

//       if (!selectedOption) return null;

//       return selectedOption;
//    }, [selecedId, options]);

//    return (
//       <Autocomplete
//          openText="Abrir"
//          closeText="Fechar"
//          noOptionsText="Sem Opcoes"
//          loadingText="Carregando..."

//          disablePortal

//          value={autoCompleteSelectedOptions}
//          disabled={isExternalLoading}
//          onInputChange={(_, newValue) => setSearch(newValue)}
//          onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError() }}
//          popupIcon={(IsLoading || isExternalLoading) ? <CircularProgress size={28} /> : undefined}
//          loading={IsLoading}
//          options={options}
//          renderInput={(params) => (<TextField {...params} label="Cidade" error={!!error}
//             helperText={error} />)}
//       />
//    )
// }
