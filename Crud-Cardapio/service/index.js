import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors'

const listenerPort = 8080;
const app = express();

app.use(json());
app.use(cors());

var bd = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cardapio'
})


app.get('/cardapio', (req, res) =>{
    let SQL = 'SELECT * FROM cardapio';

    bd.query(SQL, (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json(result);
        }
    });
});

app.get('/cardapio/:id', (req, res) =>{
    let {id} = req.params;
    let SQL = 'SELECT * FROM cardapio WHERE idcardapio = ?';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err
        }
        else{
            return res.json(result);
        }
    });
});

app.post('/adicionar/', (req, res) =>{
    let {lanches, valor} = req.body;
    console.log(lanches, valor);
    let SQL = 'INSERT INTO cardapio (lanches, valor) VALUES (?, ?)';

    bd.query(SQL, [lanches, valor], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Produto adicionado com sucesso!');
        }
    });
});

app.put('/editar/:id', (req, res) =>{
    let {lanches, valor} = req.body;
    let {id} = req.params;
    let SQL = 'UPDATE cardapio SET lanches = ?, valor = ? WHERE idcardapio = ?;';

    bd.query(SQL, [lanches, valor, id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Produto alterado com sucesso!');
        }
    });
});

app.delete('/excluir/:id', (req, res) =>{
    let {id} = req.params;
    let SQL = 'DELETE FROM cardapio WHERE idcardapio = ?;';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Produto excluido com sucesso!');
        }
    });
});


app.listen(listenerPort, () =>{
    console.log('Servidor rodando | https://localhost:',+listenerPort)
})