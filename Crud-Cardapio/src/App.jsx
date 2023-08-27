import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [cardapio, setCardapio] = useState();
  const [insert, setInsert] = useState(false);
  const [edit, setEdit] = useState(false)
  const [idItem, setIdItem] = useState();
  const [newLanche, setNewLanche] = useState({
    lanches: '',
    valor: 0
  });

  useEffect(() => {
    getLanches();
	}, []);

  const getLanches = () =>{
    axios.get('http://localhost:8080/cardapio/').then((res) =>{
      setCardapio(res.data);
    });
  }

  const aoInserir = () =>{
    event.preventDefault();
    axios.post('http://localhost:8080/adicionar/',{
      lanches: newLanche.lanches,
      valor: newLanche.valor
    }).then((res) =>{
      setInsert(true);
      getLanches();
    }).catch((err) =>{
      setInsert(false);
      console.log(err);
    })
  }

  const aoExcluir = (id) =>{
    axios.delete(`http://localhost:8080/excluir/${id}`).then((res) =>{
      getLanches();
    }).catch((err) =>{
      console.log(err);
    })
  }

  const onClickEdit = (id) =>{
    setEdit(true)
    axios.get(`http://localhost:8080/cardapio/${id}`).then((res) =>{
      res.data.map((item) =>{
        setNewLanche({
          lanches: item.lanches,
          valor: item.valor
        })
        setIdItem(item.idcardapio)
      })
    })
  }
  
  const aoEditar = () =>{
    event.preventDefault();
    axios.put(`http://localhost:8080/editar/${idItem}/`, {
      lanches: newLanche.lanches,
      valor: newLanche.valor
    }).then((res) =>{
      getLanches()
      setEdit(false)
      setNewLanche({
        lanches: '',
        valor: 0
      })
    }).catch((err) =>{
      console.log(err);
    })
  }

  const aoAlterar = (e) =>{
    let novoLanche = {
      ...newLanche,
      [e.target.name]: e.target.value
    }
    setNewLanche(novoLanche);
  }

    return(
      <div className='container-principal'>
        <div>
          <div>
            <h1>Inserir itens ao cardapio</h1>
          </div>
          <div className='container-inputs'>
            <div className='card'>
            <form action="#">
              <label htmlFor="lanche">
                <p>Lanche</p>
                <input type="text" name='lanches' placeholder='Digite o lanche' value={newLanche.lanches} onChange={aoAlterar} required/>
              </label>
              <label htmlFor="valor">
                <p>Valor</p>
                <input type="number" name="valor" placeholder='Insira o valor' value={newLanche.valor} onChange={aoAlterar} required/>
              </label>
              {
              edit ? <label htmlFor="botao">
                      <button onClick={aoEditar} >Editar</button>
                    </label>
                    : 
                    <label htmlFor="botao">
                      <button onClick={aoInserir} >Inserir</button>
                    </label>
              }
              <div>
                {insert && <p className='nice'>Inserido com sucesso!</p>}
              </div>
            </form>
            </div>
          </div>
        </div>
        <div className='container-titulo'>      
          <h1>Cardapio</h1>
        </div>
        <div className='container-produtos'>
          {cardapio &&
            cardapio.map((item) =>{
              return(
                <>
                  <div className='flex'>
                    <div className='card'>
                      <div className='card-produto' key={item.idcardapio}>
                        <h3>{item.lanches}</h3>
                        <p>R$ {item.valor}</p>
                      </div>
                      <div className='botoes'>
                        <button onClick={() => onClickEdit(item.idcardapio)}>Editar</button>
                        <button onClick={() => aoExcluir(item.idcardapio)}>Excluir</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    )
}

export default App
