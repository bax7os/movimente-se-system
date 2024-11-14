import React, { useState } from 'react';
import '../Styles/Cadastro/Cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignUpValidation';
import logo from '../uploads/logo.png';
import axios from 'axios';

function Cadastro() {
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';
    const [values, setValues] = useState({ nome: '', email: '', senha: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (Object.keys(errors).length === 0) {
            axios.post(`${baseUrl}/usuarios/`, values)
                .then(res => {
                    console.log(res);
                    navigate('/'); // Redirecionar após o sucesso
                })
                .catch(error => {
                    console.error("Erro no servidor:", error.response.data);
                    setServerError(error.response.data.mensagem || 'Erro no servidor');
                });
        }
    };

    return (
        <div className="cadastro-container">
        <div className="cadastro-box">
  
        <Link to="/">  <button className="back-button-cadastro">Voltar</button></Link>
            <div className="logo-container">
            <img src={logo} alt="Movimente-se" className="logo" />
          </div>
          <h3 className='title-cadastro'>Novo Cadastro</h3>
          {serverError && <p className="error-message">{serverError}</p>}

            <form id="cadastroForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                
                  <input type="text" id="nome" name="nome" placeholder="Nome Completo" onChange={handleInput} />
                  {errors.nome && <span className='text-danger'>{errors.nome}</span>}
                </div>
                <div className="form-group">
                 
                  <input type="email" id="e-mail" name='email' placeholder="Email" onChange={handleInput} />
                  {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                 
                  <input type="password" id="Senha" name="senha" placeholder="Senha" onChange={handleInput} />
                  {errors.senha && <span className='text-danger'>{errors.senha}</span>}
                </div>
              </div>
              <button type="submit" className="submit-button-cadastro">Cadastrar</button>
            </form>
     
        </div>
      </div>
      
    );
}

export default Cadastro;
