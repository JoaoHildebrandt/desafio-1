const express = require('express');
const server = express();

server.use(express.json());

const projects = [];
let reqNumber = 0;

//Middlewares

server.use((req, res, next) => {
  reqNumber++;
  console.log(reqNumber);

  next();
});

function checkUserId(req, res, next) {
  const { index } = req.params;
 
  if(!projects[index]) {
    return res.status(400).json({error: 'User not found on request body'});
  }

  return next();
}

function checkArrayIsEmpty(req, res, next) {
  if(projects == '') {
    return res.status(400).json({error: 'User not found on request body'});
  }

  return next();
}

//CRUD

server.get('/projects', checkArrayIsEmpty ,(req, res) => {
  return res.json(projects);
});

server.get('/projects/:index', checkUserId, (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

server.post('/projects', (req, res) => {
  const { title } = req.body;
  
  projects.push(
    {
      id: (projects.length + 1).toString(),
      title: title,
      tasks: []
    }
  )

  return res.json(projects);
});

server.post('/projects/:index/tasks', checkUserId, (req,res) => {
  const { index } = req.params;
  const { title } = req.body;

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.put('/projects/:index', checkUserId, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;
  const { task } = req.body;

  projects[index].title = title;
  projects[index].tasks = [task];

  return res.json(projects);
});

server.delete('/projects/:index', checkUserId, (req, res) => {
  const { index } = req.params;

  projects.splice(index,1);

  return res.send();
});

server.listen(3000);
