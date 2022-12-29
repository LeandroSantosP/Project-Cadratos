import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BarraDeFerramentasDeDetalhes } from '../../shared/components';
import { LayoutDefault } from '../../shared/layouts';
import { PessoasServices, IDetalhePessoa } from '../../shared/services/api/pessoas/PessoasServises';

export const DetalhesDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const [userInfos, setUserInfos] = useState<IDetalhePessoa>();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('')
  const navigate = useNavigate();


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
            setUserInfos(result);
          }
        })
    }
  }, [id]);

  const handleSave = () => {
    console.log("save")
  }


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
  }


  return (
    <LayoutDefault
      title={id == 'nova' ? 'Nova Pessoa' : `Editando: ${title}`}
      toolBar={
        <BarraDeFerramentasDeDetalhes
          showBtnSaveAndBack
          showSkeletons
          showBtnNew={id !== 'nova'}
          showBtnDelete={id !== 'nova'}
          textNewBtn='Nova'

          onClickSave={() => handleSave()}
          onClickSaveAndBack={() => { }}
          onClickBack={() => navigate('/pessoas/')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/pessoas/detalhe/nova')}
        />}>
      {isLoading && <LinearProgress variant='indeterminate' />}
      <p>detalhes</p>
    </LayoutDefault>
  )
}
