import React, { useState } from 'react';
import '../Styles/Login/Login.css';
import logo from '../uploads/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';

import axios from 'axios';
function Login() {
  const [values, setValues] = useState({ email: '', senha: '' });
  const [errors, setErrors] = useState({});
  const baseUrl = 'http://localhost:3000';
  const [serverError, setServerError] = useState(''); 
  const navigate = useNavigate();
  const handleInput = (event) => {
    console.log(event.target.value);
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values)); // Função de validação não incluída aqui
    console.log(values);
    if (Object.keys(errors).length === 0) {
      axios.post(`${baseUrl}/usuarios/login`, values)
        .then(res => {
          console.log(res.data);
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            console.log('Token armazenado:', res.data.token);
            navigate('/Home'); 
            
          } else {
            setServerError(res.data.mensagem);
          }
        })
        .catch(error => {
          console.error("Erro no servidor:", error.response.data);
          setServerError(error.response.data.mensagem || 'Erro no servidor');
        });
    }
  };
  return (
<div className="login-container">
  <div className="login-box">
    <div className="logo-container"> <img src={logo} alt="Movimente-se" className="logo" /></div>
   
    <form onSubmit={handleSubmit}>
      <h3 className='title-login'>Login</h3>
      <div className="field">
        <input type="email" id="email" name="email" placeholder="Email" onChange={handleInput} />
        <div className="line" />
      </div>
      {errors.email && <span className='text-danger'>{errors.email}</span>}
      <div className="field">
        <input type="password" id="senha" name="senha" placeholder="Senha" onChange={handleInput} />
        <div className="line" />
      </div>
      {errors.senha && <span className='text-danger'>{errors.senha}</span>}
      <div className="options-login">
        <Link to="/cadastro">Novo cadastro</Link>
        <Link to="/redefinir-senha">Esqueci Senha</Link>
      </div>
      <button type="submit" className="btn-login">Login</button>
    </form>
  </div>
</div>

  );
}

export default Login;