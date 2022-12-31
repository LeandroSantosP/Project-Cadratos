import { Box } from '@mui/system';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LayoutDefault } from '../../shared/layouts';
import { VForm, VTextField, useVForm } from '../../shared/forms';
import { BarraDeFerramentasDeDetalhes } from '../../shared/components';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServises';
import { ConfirmationNumberSharp } from '@mui/icons-material';


interface IFormData {
  email: string;
  cityId: number
  completeName: string;
}

export const DetalhesDePessoas: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { FormRef, save, IsSaveAndClose, saveAndClose } = useVForm();

  useEffect(() => {
    setIsLoading(true)
    if (id !== 'nova') {
      PessoasServices.getById(Number(id))
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas/');
          } else {
            setTitle(result.completeName)
            FormRef.current?.setData(result)
          }
        })
    } else {
      setIsLoading(false);
      FormRef.current?.setData({
        completeName: '',
        email: '',
        cityId: ''
      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasServices.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas/')
          }
        });
    }
  };

  const handleSave = (dados: IFormData) => {
    setIsLoading(true); 
    

    if (id === 'nova') {
      PessoasServices.create(dados)
        .then(result => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if(IsSaveAndClose.current){
              navigate(`/pessoas/`)
            } else {
              navigate(`/pessoas/detalhe/${result}`)
            }
          }

        });
    } else {
      PessoasServices.updateById(Number(id), { id: Number(id), ...dados })
        .then(result => {
          setIsLoading(false);

          if (result instanceof Error) {
            console.log(result)
            alert(result.message);
          } else {
            if(IsSaveAndClose.current){
              navigate(`/pessoas/`)
            }
          }
        });
      }
  };


  return (
    <LayoutDefault
      title={id == 'nova' ? 'Nova Pessoa' : `${title}`}
      toolBar={
        <BarraDeFerramentasDeDetalhes
          showBtnSaveAndBack
          showSkeletons
          showBtnNew={id !== 'nova'}
          showBtnDelete={id !== 'nova'}
          textNewBtn='Nova'

          onClickSave={save}
          onClickSaveAndBack={saveAndClose}
          onClickBack={() => navigate('/pessoas/')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
        />}>

      <VForm ref={FormRef} onSubmit={handleSave} >
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction={'column'} padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

                <Grid item>
                  <Typography variant='h6'>
                    Geral
                  </Typography>
                </Grid>
                <Grid container item direction='row' spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      label='Digite o nome completo'
                      name='completeName'
                      fullWidth
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isLoading} />
                  </Grid>
                </Grid>

                <Grid container item direction='row' spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >
                    <VTextField
                      label='Digite um E-mail valido'
                      name='email'
                      fullWidth
                      disabled={isLoading} />
                  </Grid>
                </Grid>

                <Grid container item direction='row' spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <VTextField
                      label='Cidade'
                      name='cityId'
                      fullWidth
                      disabled={isLoading}/>
                  </Grid>
                </Grid>

          </Grid>
        </Box>
      </VForm>

    </LayoutDefault>
  )
}
