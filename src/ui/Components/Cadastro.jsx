import React, { useState } from 'react';
import '../Styles/Cadastro/Cadastro.css';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignUpValidation';
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
        <div>
            <div className="container_cadastro">
                <button className="back-button"><Link to="/">Voltar</Link></button>
                <h1>Novo Cadastro</h1>
                {serverError && <p className="error-message">{serverError}</p>}
                <div className="form-container_cadastro">
                    <p>Preencha os campos a seguir</p>
                    <form id="cadastroForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nome">Nome Completo</label>
                                <input type="text" id="nome" name="nome" placeholder="Digite aqui..." onChange={handleInput} />
                                {errors.nome && <span className='text-danger'>{errors.nome}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="e-mail" name='email' placeholder="Digite aqui..." onChange={handleInput} />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="senha">Senha</label>
                                <input type="password" id="Senha" name="senha" placeholder="Digite aqui..." onChange={handleInput} />
                                {errors.senha && <span className='text-danger'>{errors.senha}</span>}
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
