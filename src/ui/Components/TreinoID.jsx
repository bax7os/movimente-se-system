import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/AlunoID/AlunoID.css';
import { useNavigate } from 'react-router-dom';

function TreinoID() {
  const navigate = useNavigate();
  const { id_treino } = useParams();
  const [treinos, settreinos] = useState({});
  const [values, setValues] = useState({ nome: '', idade: '', cpf: '', data_de_cadastro: '', comorbidade: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:3000/treinos/${id_treino}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        settreinos(response.data.treino);
        setValues({
          ...response.data.treino
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [id_treino, token]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/treinos/${id_treino}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Resposta do servidor:', response);
  
      if (response.status === 200) {
        console.log('Treino deletado com sucesso:', response.data);
        navigate('/gerar-treinos');
      } else {
        console.error('Erro ao deletar treino:', response.data);
        setServerError(response.data.mensagem || 'Erro ao deletar treino');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      console.error('Erro detalhado:', error.response.data);
      setServerError('Erro inesperado');
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const updatedValues = {
      ...values
    };

    axios.patch(`http://localhost:3000/treinos/${id_treino}`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Treino atualizado com sucesso:", response.data);
      })
      .catch(error => {
        console.error("Erro ao atualizar treino:", error);
        setServerError(error.response.data.mensagem || 'Erro no servidor');
      });
  };

  return (
    <div className="container">
      <header className="header">
        <button className="back-button" onClick={() => window.history.back()}>Voltar</button>
      </header>
      <div className="personalization">
        <h1>Detalhes do Treino</h1>
      </div>
      <hr />
      <div className="central-container">
        <div className="details">
          <h2>Informações do Treino</h2>
          <ul>
            <li><strong>Categoria:</strong> {treinos.tipo}</li>
            <li><strong>Tipo:</strong> {treinos.alvo}</li>
            <li><strong>Descrição:</strong> {treinos.descricao}</li>
          </ul>
        </div>
        <div className="news">
        <div className="central-container">
          <div className="box1">
            <form id="cadastroForm" onSubmit={handleUpdate}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tipo">Tipo de treino</label>
                  <select id="tipo" name="tipo" onChange={handleInput}>
                    <option value="">Selecione</option>
                    <option value="Fortalecimento específico">Fortalecimento específico</option>
                    <option value="Superiores">Superiores</option>
                    <option value="CORE">CORE</option>
                    <option value="Estabilidade">Estabilidade</option>
                    <option value="Mobilidade">Mobilidade</option>
                  </select>
                  {errors.tipo && <span className='text-danger'>{errors.tipo}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="alvo">Categoria</label>
                  <select id="alvo" name="alvo"  onChange={handleInput}>
                    <option value="">Selecione</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Adulto">Adulto</option>
                  </select>
                  {errors.alvo && <span className='text-danger'>{errors.alvo}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <input type="text" id="descricao" name="descricao" placeholder="Digite aqui..."  onChange={handleInput}/>
                  {errors.descricao && <span className='text-danger'>{errors.descricao}</span>}
                </div>
              </div>
              <button type="submit" className="submit-button" >Cadastrar </button>
            </form>
          </div>
        </div>
      </div>
      </div>
      <button type="submit" className="submit-button-2" onClick={handleDelete}>Deletar</button>
    </div>
  );
}

export default TreinoID;
