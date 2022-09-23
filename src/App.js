import logo from './logo.svg';
import './App.css';
import Vendas from './vendas/Vendas';
import Header from './header/Header';

function App() {
  return (
    <div className='Page'> 
    <Header />
      <div className='Container'>
        <Vendas />
      </div>
    </div>
    
  );
}

export default App;
