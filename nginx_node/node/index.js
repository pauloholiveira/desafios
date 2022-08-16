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

const create = 'CREATE TABLE people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))';
const insert1 = 'INSERT INTO people (name) values(\'Paulo Henrique de Oliveira\')';
const insert2 = 'INSERT INTO people (name) values(\'Fulano\')';
const insert3 = 'INSERT INTO people (name) values(\'João da Silva\')';
const select = 'SELECT * FROM people';

connection.query(
    create,
    function(err, rows){
      if(err) {
        console.log("Tabela people já existe.");
      }
    }            
  );

  connection.query(
    insert1,
    function(err, rows){
      if(err) {
        console.log("Erro ao inserir na tabela.");
      }
    }            
  );
  connection.query(
    insert2,
    function(err, rows){
      if(err) {
        console.log("Erro ao inserir na tabela.");
      }
    }            
  );
  connection.query(
    insert3,
    function(err, rows){
      if(err) {
        console.log("Erro ao inserir na tabela.");
      }
    }            
  );

connection.end();

let nomes;

app.get('/', (req,res) => {
    
    let connection2 = mysql.createConnection(config);
    connection2.query(
        select,
        function(err, rows){
          if(err) throw err;
          nomes = rows;
          console.log(rows);
        }            
    );
    connection2.end();
    
    html_response = '<h1>Full Cycle</h1>';
    html_response += '<h3>Pessoas</h3>';
    html_response += '<table>';
    html_response += '  <tr><th>ID</th><th>NOME</th></tr>';
    nomes.forEach(element => {
        console.log('ID: '+element.id+ ' -  NOME: '+element.name);
        html_response += '  <tr><td>'+element.id+ '</td><td>'+element.name+'</td></tr>';
        
    });
    html_response += '</table>';

    res.send(html_response);

})

app.listen(port, () =>{
    console.log('Rodando na porta ' + port)
})