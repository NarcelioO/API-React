
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [livros, setLivros] =useState([])
  const [busca, setBusca] = useState('')
  //const livrosFiltrados = livros.filter((livro)=> livro.startsWith(busca))
  useEffect(()=>{
    const params = {}
    if(busca){
      params.title = busca
    } 
    axios.get('http://hn.algolia.com/api/v1/search?query=foo&tags=',{params}).then(({data})=>{
        setLivros(data.hits)
       
    })
  },[busca])
  
 

  
  return (
    <div className='main'>
      <h2>{process.env.REACT_APP_TITLE}</h2>
      <form>
      <input 
      type='text' 
      value={busca} 
      onChange={(ev) => setBusca(ev.target.value)} 
      placeholder='pesquisar...'/>
      
     </form>
    {livros?.map((livro)=>(
      <div className='list' >
        <div className='text'>
        <h3>👥{livro.author}</h3>
        <h3>📖{livro.title}</h3>
        <a href={livro.url}>🔗Ver mais...</a>
        </div>
      </div>

    ))}
        
    
    </div>
  )
}

export default App;
