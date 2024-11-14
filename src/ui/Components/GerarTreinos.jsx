import React, { useState, useEffect } from 'react';
import '../Styles/GerarTreinos/GerarTreinos.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GerarTreinos() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [treinos, setTreinos] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showFicha, setShowFicha] = useState(false);
  const [selectedAlvo, setSelectedAlvo] = useState('');
  const token = localStorage.getItem('token');

  const handleNavigateTreino = (id_treino) => { navigate(`/treinos/${id_treino}`); };

  useEffect(() => {
    axios.get('http://localhost:3000/treinos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.data && response.data.treinos) {
          setTreinos(response.data.treinos);
        } else {
          console.error('Resposta da requisição não é um array de treinos');
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

  const treinosInfantil = treinos.filter(treino => treino.alvo === 'Infantil');
  const treinosAdulto = treinos.filter(treino => treino.alvo === 'Adulto');

  const handleShowOptions = () => {
    setShowOptions(true);
    setShowFicha(false);
  };

  const handleSelectAlvo = (alvo) => {
    setSelectedAlvo(alvo);
    setShowOptions(false);
    setShowFicha(true);
  };

  return (
    <div className="container-GerarTreinos">
      <header className="header-GerarTreinos">
        <Link to="/Home"><button className="back-button-GerarTreinos">Voltar</button></Link>
      </header>
      <div className="personalization-GerarTreinos">
        <h1>Gerar Ficha de Treinos</h1>
      </div>
      <hr />
      <div className="central-GerarTreinos">
      <div className="central-container-GerarTreinos">
        <div className="box1-GerarTreinos">
          <h2>Treinos Infantis</h2>
          {treinosInfantil.map(treino => (
            <button id="button-treino" key={treino.id_treino} onClick={() => handleNavigateTreino(treino.id_treino)}>
              {treino.tipo}
            </button>
          ))}
        </div>
        <div className="box2-GerarTreinos">
          <h2>Treinos para Adultos</h2>
          {treinosAdulto.map(treino => (
            <button id="button-treino" key={treino.id_treino} onClick={() => handleNavigateTreino(treino.id_treino)}>
              {treino.tipo}
            </button>
          ))}
        </div>
      </div>
      <div className="generate-treino-container">
        <button className="generate-treino-button" onClick={handleShowOptions}>Gerar Treino</button>
        {showOptions && (
          <div className="options-container">
            <button onClick={() => handleSelectAlvo('Infantil')}>Gerar Treino Infantil</button>
            <button onClick={() => handleSelectAlvo('Adulto')}>Gerar Treino Adulto</button>
          </div>
        )}
        {showFicha && (
          <div className="ficha-container">
            <h2>Ficha de Treinamento {selectedAlvo}</h2>
            <div className='box-Ficha'>
            {(selectedAlvo === 'Infantil' ? treinosInfantil : treinosAdulto).map(treino => (
              <div key={treino.id_treino} className="ficha-treino">
              
                <h3>{treino.tipo}</h3>
                <p>{treino.descricao}</p>
                
              </div>
              
            ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default GerarTreinos;
