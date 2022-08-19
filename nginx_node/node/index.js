const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',//serviço que o docker criou
    user: 'root',
    password: 'root',
    database: 'nodedb' 
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const insert = 'INSERT INTO people (name) values(\'Paulo Henrique de Oliveira\')';
const select = 'SELECT * FROM people order by id';

connection.query(
  insert,
  function(err, rows){
    if(err) {
      console.log("Erro ao inserir registro. ");
      console.log(err);
    }
  }            
);
connection.end();

function listaPessoasHTML(res){
  html_response =  '<h1>Full Cycle</h1>';
  html_response += '<h3>Pessoas</h3>';
  html_response += '<table>';
  html_response += '  <tr><th>ID</th><th>NOME</th></tr>';

  var conLista =  mysql.createConnection(config);
  var busca = 'SELECT * FROM people order by id';
  conLista.query(busca, (error, results, fields) => {
    if(error) 
      console.log('Erro: '+ error);
    else {

      for (const nome of results) {
        console.log(nome);
        console.log(nome.id);
        console.log(nome.name);
        html_response += '  <tr><td>'+nome.id+ '</td><td>'+nome.name+'</td></tr>';
      }

    }
    conLista.end();
    
    html_response += '</table>';
    console.log('executou Lista de Pessoas!');
    res.send(html_response);
});
}


app.get('/', (req,res) => {
  listaPessoasHTML(res);
})

app.listen(port, () =>{
    console.log('Rodando na porta ' + port)
})