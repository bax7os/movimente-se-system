import React, { useState, useEffect } from 'react';
import '../Styles/CadastroTreinos/CadastroTreinos.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';

function CadastroAluno() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const baseUrl = 'http://localhost:3000';
    const [values, setValues] = useState({ nome: '', idade: '', cpf: '', data_de_cadastro: '', comorbidade: '' });
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
   
        console.log(values);
        if (Object.keys(errors).length === 0) {
          // Adiciona o ID do usuário ao objeto values
          const valuesWithUserId = { ...values, usuarios_id_usuario: user.id_usuario };
    
          const token = localStorage.getItem('token');
          axios.post(`${baseUrl}/alunos/`, valuesWithUserId, {
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
      <div className="container-cadastro">
        
        <header className="header-cadastro">
        <Link to="/Home"> <button className="back-button-cadastrot" >Voltar</button></Link>
        </header>
        <div className="personalization-cadastro">
          <h1>Cadastro de alunos </h1>
        </div>
        {serverError && <p className="error-message">{serverError}</p>}
    
        <div className="news-cadastro">
                
              <form className="cadastroForm-cadastro" onSubmit={handleSubmit}>
                        <div className="form-row-cadastro">
                            <div className="form-group-cadastro">
                                <label htmlFor="nome">Nome Completo</label>
                                <input type="text" id="nome" name="nome" placeholder="Digite aqui..." onChange={handleInput} />
                                {errors.nome && <span className='text-danger'>{errors.nome}</span>}
                            </div>
                            <div className="form-group-cadastro">
                                <label htmlFor="idade">Idade</label>
                                <input type="int" id="idade" name='idade' placeholder="Digite aqui..." onChange={handleInput} />
                                {errors.idade && <span className='text-danger'>{errors.idade}</span>}
                            </div>
                        </div>
                        <div className="form-row-cadastro">
                            <div className="form-group-cadastro">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" id="cpf" name="cpf" placeholder="Digite aqui..." onChange={handleInput}/>
                                {errors.cpf && <span className='text-danger'>{errors.cpf}</span>}
                            </div>
                            <div className="form-group-cadastro">
                                <label htmlFor="data_de_cadastro">Data de Cadastro</label>
                                <input type="date" id="data_de_cadastro" name="data_de_cadastro" placeholder="Digite aqui..." onChange={handleInput}/>
                                {errors.data_de_cadastro && <span className='text-danger'>{errors.data_de_cadastro}</span>}
                            </div>
                        </div>
                        <div className="form-row-cadastro">
                            <div className="form-group-cadastro">
                                <label htmlFor="comorbidade">Comorbidade</label>
                                <input type="comorbidade" id="comorbidade" name="comorbidade" placeholder="Digite aqui..." onChange={handleInput}/>
                                {errors.comorbidade && <span className='text-danger'>{errors.comorbidade}</span>}
                            </div>
                        </div>

                        <button type="submit" className="submit-button-cadastro">Cadastrar</button>
                    </form>
             
       
        </div>
      </div>
    );
}

export default CadastroAluno;

