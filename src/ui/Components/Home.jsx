import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/Home/Home.css';

function Home() {
  const [alunos, setAlunos] = useState([]);
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token de autenticação
    navigate('/'); // Redireciona para a página de login
  };

  const handleNavigateCadastroAluno = () => { navigate('/cadastro-aluno', { state: { user } }); };
  const handleNavigateCadastroTreino = () => { navigate('/cadastro-treino', { state: { user } }); };
  const handleNavigateGerarTreinos= () => { navigate('/gerar-treinos', { state: { user } }); };

  // Função para navegar para a página de detalhes do aluno
  const handleNavigateAluno = (id_aluno) => { navigate(`/aluno/${id_aluno}`); };

  useEffect(() => {
    axios.get('http://localhost:3000/alunos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.data && response.data.alunos) {
          setAlunos(response.data.alunos);
        } else {
          console.error('Resposta da requisição não é um array de alunos');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
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
  }, [token]);

  return (
<div className="container-home">
  <header className="header-home">
    <button className="back-button-home no-arrow" onClick={handleLogout}>Sair</button>
  </header>
  <div className="personalization-home">
    <h1>Olá, Professor(a) {user.nome}</h1>
  </div>
  <hr />
  <div className="news-home">
    <div className="button-container-home">
      <button className="new-student-home" onClick={handleNavigateCadastroAluno}>Cadastrar novo aluno</button>
      <button className="new-treino-home" onClick={handleNavigateCadastroTreino}>Cadastrar Treinos</button>
    </div>
    <div className="central-container-home">
      <div className="box-container-home">
        <div className="title-box-home">
          <h2>Lista de Alunos</h2>
        </div>
        <div className="box-content-home">
          {alunos.map(aluno => (
            <button className="button-alunos-home" key={aluno.id_aluno} onClick={() => handleNavigateAluno(aluno.id_aluno)}>
              {aluno.nome}
            </button>
          ))}
        </div>
      </div>
    </div>
    <button className="new-treino-home" onClick={handleNavigateGerarTreinos}>Treinos</button>
  </div>
</div>

  );
}

export default Home;
