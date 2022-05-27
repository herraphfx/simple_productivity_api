const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;




const db = require('knex')({
    client: 'pg',
    connection: {
        host:  '127.0.0.1' || 'ec2-34-230-153-41.compute-1.amazonaws.com',
        user:  'postgres' || 'rajfynbfivvpxc',
        password: 'Living@123' || '17511953e289e0cbbaffd6b1380d526c1008ddcea584d526f6bc501d07e4791a',
        database: 'finalproject' || 'd46n57l5ue20qg',
        port: 5432,
        ssl: { 
            rejectUnauthorized: false 
        }
        
    }
});
  
app.set("db", db);

app.listen(PORT, () => console.log('Example app listening on port 3000!'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())


app.get('/', (req, res) => {
    db
    .select().from('todo_entries')
    .then(todo =>
            res.send(todo)
    )
})

app.post('/tasks', (req, res) => {
    
    db('todo_entries')
    .insert({description: req.body.description, 
            due_date: req.body.due_date, 
            completed: req.body.completed, 
            deleted: req.body.deleted, 
            todolist_id: req.body.todolist_id
        })
    .then(added => 
        res.send(added)
        )
})

app.delete('/tasks/:id', (req, res) => {
    console.log('Delete request received');
  db('todo_entries')
  .where('id', req.params.id )
  .del()
  .then(() =>
    db
    .select().from('todo_entries')
    .then(todo =>
            res.send(todo)
    )
    )
})


