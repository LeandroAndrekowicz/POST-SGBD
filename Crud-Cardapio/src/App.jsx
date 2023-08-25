import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {

  const [cardapio, setCardapio] = useState();
  const [editar, setEditar] = useState(false);
  const [data, setData] = useState();


  useEffect(() => {
		axios.get('http://localhost:8080/cardapio').then((res) =>{
      setCardapio(res.data);
    });
	}, []);

  const aoEditar = (id) =>{
    setEditar(true);

    axios.get(`http://localhost:8080/cardapio/${id}`).then((res) =>{
      console.log(res.data[0].idcardapio);
    });
    console.log(data);
  }

    return(
      <div className='container-principal'>
        <div className='container-titulo'>      
          <h2>Cardapio</h2>
        </div>
        <div className='container-produtos'>
          {cardapio &&
            cardapio.map((item) =>{
              return(
                <>
                  <div className='card-produto'>
                    <h3>lanche: {item.lanches}</h3>
                    <p>valor: {item.valor}</p>
                  </div>
                  <button onClick={() => aoEditar(item.idcardapio)}>Editar</button>
                  <button>Excluir</button>
                </>
              )
            })
          }
        </div>
        {editar && 
          <>
            <div className='editar'>
              <h3>Edição</h3>

            </div>
          </>
        }
      </div>
    )
}

export default App
