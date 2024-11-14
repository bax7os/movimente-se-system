import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../Styles/AlunoID/AlunoID.css';

function AlunoID() {
  const navigate = useNavigate();
  const { id_aluno } = useParams();
  const [aluno, setAluno] = useState({});
  const [values, setValues] = useState({ nome: '', idade: '', cpf: '', data_de_cadastro: '', comorbidade: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:3000/alunos/${id_aluno}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setAluno(response.data.aluno);
        setValues({
          ...response.data.aluno,
          data_de_cadastro: response.data.aluno.data_de_cadastro.split('T')[0], // Formata a data para 'YYYY-MM-DD'
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [id_aluno, token]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const updatedValues = {
      ...values,
      data_de_cadastro: new Date(values.data_de_cadastro).toISOString().split('T')[0], // Certifica-se que a data está no formato 'YYYY-MM-DD'
    };

    axios.patch(`http://localhost:3000/alunos/${id_aluno}`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log("Aluno atualizado com sucesso:", response.data);
      })
      .catch(error => {
        console.error("Erro ao atualizar aluno:", error);
        setServerError(error.response.data.mensagem || 'Erro no servidor');
      });
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/alunos/${id_aluno}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 204) {
        navigate('/Home');
      } else if (response.status === 200) {
        console.log('Aluno deletado com sucesso:', response.data);
        navigate('/Home');
      } else {
        console.error('Erro ao deletar aluno:', response.data);
        setServerError(response.data.mensagem || 'Erro ao deletar aluno');
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      setServerError('Erro inesperado');
    }
  };

  return (
    <div className="container-aluno">
    <header className="header-aluno">
      <button className="back-button-aluno" onClick={() => window.history.back()}>Voltar</button>
    </header>
    <div className="personalization-aluno">
      <h1>Detalhes do Aluno</h1>
    </div>
    <div className="central-container-aluno">
      <div className="details-aluno">
        <h2>Informações do Aluno</h2>
        <ul>
          <li><strong>Nome:</strong> {aluno.nome}</li>
          <li><strong>Idade:</strong> {aluno.idade}</li>
          <li><strong>CPF:</strong> {aluno.cpf}</li>
          <li><strong>Data de Cadastro:</strong> {values.data_de_cadastro}</li>
          <li><strong>Comorbidade:</strong> {aluno.comorbidade}</li>
        </ul>
      </div>
      <div className="details-aluno">
        <h2>Editar Aluno</h2>
        {serverError && <p className="error-message">{serverError}</p>}
        <form id="editForm-aluno" onSubmit={handleUpdate}>
          <div className="form-row-aluno">
            <div className="form-group-aluno">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" name="nome" value={values.nome} placeholder="Digite aqui..." onChange={handleInput} />
              {errors.nome && <span className="text-danger">{errors.nome}</span>}
            </div>
            <div className="form-group-aluno">
              <label htmlFor="idade">Idade</label>
              <input type="number" id="idade" name="idade" value={values.idade} placeholder="Digite aqui..." onChange={handleInput} />
              {errors.idade && <span className="text-danger">{errors.idade}</span>}
            </div>
          </div>
          <div className="form-row-aluno">
            <div className="form-group-aluno">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" value={values.cpf} placeholder="Digite aqui..." onChange={handleInput} />
              {errors.cpf && <span className="text-danger">{errors.cpf}</span>}
            </div>
            <div className="form-group-aluno">
              <label htmlFor="data_de_cadastro">Data de Cadastro</label>
              <input type="date" id="data_de_cadastro" name="data_de_cadastro" value={values.data_de_cadastro} placeholder="Digite aqui..." onChange={handleInput} />
              {errors.data_de_cadastro && <span className="text-danger">{errors.data_de_cadastro}</span>}
            </div>
          </div>
          <div className="form-row-aluno">
            <div className="form-group-aluno">
              <label htmlFor="comorbidade">Comorbidade</label>
              <input type="text" id="comorbidade" name="comorbidade" value={values.comorbidade} placeholder="Digite aqui..." onChange={handleInput} />
              {errors.comorbidade && <span className="text-danger">{errors.comorbidade}</span>}
            </div>
          </div>
          <button type="submit" className="submit-button-aluno">Atualizar</button>
        </form>
      </div>
    </div>
    <button type="submit" className="submit-button-2-aluno" onClick={handleDelete}>Deletar</button>
  </div>
  
  );
}

export default AlunoID;
