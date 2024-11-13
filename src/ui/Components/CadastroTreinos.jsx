import React, { useState, useEffect } from 'react';
import '../Styles/CadastroTreinos/CadastroTreinos.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CadastroTreinos() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const baseUrl = 'http://localhost:3000';
  const [values, setValues] = useState({ tipo: '', descricao: '', alvo: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/usuarios/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);
  
  const handleInput = (event) => {
    console.log(event.target.value);
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      const token = localStorage.getItem('token');
      axios.post(`${baseUrl}/treinos/`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        navigate('/home'); // Redireciona para a página inicial após cadastro
      })
      .catch(error => {
        console.error("Erro no servidor:", error.response.data);
        setServerError(error.response.data.mensagem || 'Erro no servidor');
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/Home"><button className="back-button no-arrow">Voltar</button></Link>
      </header>
      <div className="personalization">
        <h1>Cadastro de treinos</h1>
      </div>
      {serverError && <p className="error-message">{serverError}</p>}
      <hr />
      <div className="news">
        <div className="central-container">
          <div className="box1">
            <form id="cadastroForm" onSubmit={handleSubmit}>
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
                  <select id="alvo" name="alvo" onChange={handleInput}>
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
                  <input type="text" id="descricao" name="descricao" placeholder="Digite aqui..." onChange={handleInput} />
                  {errors.descricao && <span className='text-danger'>{errors.descricao}</span>}
                </div>
              </div>
              <button type="submit" className="submit-button">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroTreinos;