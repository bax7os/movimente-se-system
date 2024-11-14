import ProtegeRotas from '../Navigation/Navigation.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './Cadastro';
import Login from './Login';
import Home from './Home';
import '../Styles/App.css';
import CadastroAluno from './CadastroAluno';
import AlunoID from './AlunoID';
import CadastroTreinos from './CadastroTreinos.jsx';
import GerarTreinos from './GerarTreinos.jsx';
import TreinoID from './TreinoID.jsx';
import RedefinirSenha from './RedefinirSenha.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/Home' element={<ProtegeRotas><Home /></ProtegeRotas>}></Route>
        <Route path='/cadastro-aluno' element= {<CadastroAluno />}></Route>
      <Route path="/aluno/:id_aluno" element={<AlunoID />} /> 
      <Route path='/cadastro-treino' element= {<CadastroTreinos />}></Route>
      <Route path='/gerar-treinos' element= {<GerarTreinos />}></Route>
      <Route path="/treinos/:id_treino" element={<TreinoID />} /> 
      <Route path="/redefinir-senha" element={<RedefinirSenha />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;