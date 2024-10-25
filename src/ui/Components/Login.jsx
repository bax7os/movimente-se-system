import React, { useState } from 'react';
import '../Styles/Login/Login.css';
import logo from '../uploads/logo.png';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if(Object.keys(errors).length === 0){
      axios.post(`${apiUrl}/usuarios/login`, values)
        .then((response) => {
          console.log(response);
          navigation('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Movimente-se" />
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="Digite aqui..." onChange={handleInput} />
          {errors.email && <span className='text-danger'>{errors.email}</span>}
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" placeholder="Digite aqui..." onChange={handleInput} />
          {errors.password && <span className='text-danger'>{errors.password}</span>}

          <div className="options">
            <Link to="/cadastro">Novo cadastro</Link>
            <a href="#">Esqueci a senha</a>
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;