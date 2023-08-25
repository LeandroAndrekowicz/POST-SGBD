const express = require("express");
const mysql = require('mysql');

const listenerPort = 8080;
const app = express();

app.use(express.json());

var bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nene2023',
    database: 'petshop'
})

//Busca todos animais
app.get('/animais', (req, res) =>{
    let SQL = 'SELECT * FROM animais';

    bd.query(SQL, (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json(result);
        }
    });
});

//Busca animal por ID;
app.get('/animais/:id', (req, res) =>{
    let {id} = req.params;
    let SQL = 'SELECT * FROM animais WHERE idanimais = ?';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json(result);
        }
    });
});

//Insere animais;
app.post('/adicionar', (req, res) =>{
    let {especie, sexo, nome} = req.body;
    let SQL = 'INSERT INTO animais (especie, sexo, nome) VALUES (?, ?, ?)'

    bd.query(SQL, [especie, sexo, nome], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Animal adicionado com sucesso!');
        }
    });
});

//Edita Animais por ID;
app.put('/editar/:id', (req, res) =>{
    let {id} = req.params;
    let {especie, sexo, nome} = req.body;
    let SQL = 'UPDATE animais SET especie = ?, sexo = ?, nome = ? WHERE idanimais = ?;';

    bd.query(SQL, [especie, sexo, nome, id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Animal alterado com sucesso!');
        }
    });
});

//Deleta animal
app.delete('/deletar/:id', (req, res) =>{
    let {id} = req.params;
    let SQL = 'DELETE FROM animais WHERE idanimais = ?;';

    bd.query(SQL, [id], (err, result) =>{
        if(err){
            throw err;
        }
        else{
            return res.json('Animal deletado com sucesso!');
        }
    });
});


app.listen(listenerPort, () =>{
    console.log('Servidor rodando | https://localhost:',+listenerPort)
})