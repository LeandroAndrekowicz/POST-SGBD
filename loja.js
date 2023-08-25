const express = require("express");
const mysql = require('mysql');

const listenerPort = 8080;
const app = express();

app.use(express.json());

var bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nene2023',
    database: 'loja'
})


//Busca todos os produtos;
app.get('/produtos', (req, res) =>{
    let SQL = 'SELECT * FROM produtos';

    bd.query(SQL, (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json(result);
        }
    });

})

//Busca produto por ID;
app.get('/produtos/:id', (req, res) =>{
    let {id} = req.params
    let SQL = 'SELECT * FROM produtos WHERE idprodutos = ?';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json(result);
        }
    });
})

//Insere novos produtos;
app.post('/cadastro', (req, res) =>{
    let {produto, preco, categoria} = req.body;
    let SQL = 'INSERT INTO produtos (produto, preco, categoria) VALUES (?, ?, ?)'

    bd.query(SQL, [produto, preco, categoria], (err, result) =>{
        if(err) {
            throw err;
        }
        else{
            return res.json('Produto adicionado com sucesso');
        }
    });

})

//Edita produto por ID;
app.put('/editar/:id', (req, res) =>{
    let {id} = req.params;
    let {produto, preco, categoria} = req.body;
    let SQL = 'UPDATE produtos SET produto = ?, preco = ?, categoria = ? WHERE idprodutos = ?;';

    bd.query(SQL, [produto, preco, categoria, id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Produto alterado com sucesso');
        }
    });

});

//Deleta produto por ID;
app.delete('/deletar/:id', (req, res) =>{
    let {id} = req.params;
    let SQL = 'DELETE FROM produtos WHERE idprodutos = ?;';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Produto deletado com sucesso');
        }
    });

})

app.listen(listenerPort, () =>{
    console.log('Servidor rodando | https://localhost:',+listenerPort)
})