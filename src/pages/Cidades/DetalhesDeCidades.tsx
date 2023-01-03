import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { LayoutDefault } from '../../shared/layouts';
import { BarraDeFerramentasDeDetalhes } from '../../shared/components';
import { VForm, VTextField, useVForm, IVFormErrors } from '../../shared/forms';
import { CidadesServices } from '../../shared/services/api/Cidades/CidadesServices';
import * as yup from 'yup'


interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const DetalhesDeCidades: React.FC = () => {
  const { FormRef, save, IsSaveAndClose, saveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if (id !== 'nova') {
      CidadesServices.getById(Number(id))
        .then(result => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades/');
          } else {
            setTitle(result.name)
            FormRef.current?.setData(result)
          }
        })
    } else {
      setIsLoading(false);
      FormRef.current?.setData({
        name: '',
      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesServices.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/cidades/')
          }
        });
    }
  };

  const handleSave = (dados: IFormData) => {

    formValidationSchema.validate(dados, { abortEarly: false })
      .then((validatedDados) => {
        setIsLoading(true);
        if (id === 'nova') {
          CidadesServices.create(validatedDados)
            .then(result => {
              setIsLoading(false)
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (IsSaveAndClose.current) {
                  navigate(`/cidades/`)
                } else {
                  navigate(`/cidades/detalhe/${result}`)
                };
              };
            });
        } else {
          CidadesServices.updateById(Number(id), { id: Number(id), ...validatedDados })
            .then(result => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (IsSaveAndClose.current) {
                  navigate(`/cidades/`)
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validarionErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validarionErrors[error.path] = error.message;
        });

        FormRef.current?.setErrors(validarionErrors);
      });
  }

  return (
    <LayoutDefault
      title={id == 'nova' ? 'Nova Cidade' : `${title}`}
      toolBar={
        <BarraDeFerramentasDeDetalhes
          showBtnSaveAndBack
          showSkeletons
          showBtnNew={id !== 'nova'}
          showBtnDelete={id !== 'nova'}
          textNewBtn='Nova'

          onClickSave={save}
          onClickSaveAndBack={saveAndClose}
          onClickBack={() => navigate('/cidades/')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/cidades/detalhe/nova')}
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
                  name='name'
                  label='Nome'
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading} />
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </VForm>

    </LayoutDefault>
  )
}
