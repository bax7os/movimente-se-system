import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RedefinirSenha/RedefinirSenha.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RedefinirSenha() {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/usuarios/redefinir-senha', { email, novaSenha })
            .then(res => {
                setSuccess('Senha redefinida com sucesso.');
                setError('');
                setTimeout(() => navigate('/'), 3000);
            })
            .catch(error => {
                setError('Erro ao redefinir a senha. Verifique se o e-mail está correto.');
                setSuccess('');
            });
    };

    return (
        <div className="redefinir-senha-container">
            <div className="box-senha">
            <Link to="/"><button className="back-button-cadastro no-arrow">Voltar</button></Link>
            <h2>Redefinir Senha</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Digite seu e-mail"
                />
                <label htmlFor="novaSenha">Nova Senha</label>
                <input 
                    type="password" 
                    id="novaSenha" 
                    name="novaSenha" 
                    value={novaSenha} 
                    onChange={(e) => setNovaSenha(e.target.value)} 
                    placeholder="Digite sua nova senha"
                />
                <button type="submit">Redefinir Senha</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            </div>
        </div>
    );
}

export default RedefinirSenha;
