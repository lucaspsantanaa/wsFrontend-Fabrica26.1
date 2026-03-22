import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados da aplicação
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(true);

  // Ao carregar a página, busca todos os personagens
  useEffect(() => {
    fetchCharacters('');
  }, []);

  // Função que busca personagens na API
  const fetchCharacters = async (termo = search) => {
    setLoading(true);
    const url = termo
      ? `https://rickandmortyapi.com/api/character?name=${termo}`
      : `https://rickandmortyapi.com/api/character`;
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data.results || []);
    setLoading(false);
  };

  // Função chamada ao submeter o formulário de busca
  const handleSearch = (e) => { 
    e.preventDefault();
    fetchCharacters(search);
  };


  return (
    <div className="app">
      {/*Cabeçalho - clique para voltar ao início*/}
      <header className="header">
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png"
        alt="Rick and Morty"
        onClick={() => {setSearch(''); fetchCharacters('');}}
        style={{cursor: 'pointer', height: '80px'}}></img>
      </header>

      <main className="main">
        {/* Formulário de busca */}
        <form onSubmit={handleSearch} className ="search-form">
          <input 
          type="text"
          placeholder="Buscar personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"></input>
          <button type="submit" className="search-button">Buscar</button>
        </form>

        {/* Botão para alternar entre grade e lista */}
        <button 
          onClick={() => setIsGrid(!isGrid)} 
          className="toggle-button">
          {isGrid ? 'Ver em Lista' : 'Ver em Grade'}
        </button>

        {/* Exibe carregando ou os personagens */}
        {loading ? (
          <p className="loading">Carregando...</p>
        ) : (
          <div className={isGrid ? 'characters-grid' : 'characters-list'}>
            {characters.map((character) => (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name}></img>
                <h3>{character.name}</h3>
                <p>Status: {character.status}</p>
                <p>Espécie: {character.species}</p>
              </div>
            ))}
          </div>
        )}
      </main>

        {/* Rodapé */}
      <footer className="footer">
        <p>Desenvolvido por Lucas P. Santana - Ciência da Computação - P3 - Unipê</p>
      </footer>
    </div>  
  );
}

export default App;