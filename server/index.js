const express =require('express') // import express
const app =express(); // callling express
const cors = require('cors');//cors require for middleware
const port = process.env. PORT|| 3000; // in the same time onek people hoyto eksathe eki port e run korte chacche,tai dynamically jeno env theke genetrate hoy
app.use(cors()); // for each API call wraped with cors
app.use(express.json());//to use middleware ,user data pawar jonno
//making API
//CRUD operation
//Server is running or not checking through app.get
app.get('/',(req, res)=>{
    res.send('users server is running');
})

const users =[
    {id:1, name:'Saban', email:'sabana@gmail.com'},
    {id:2, name:'Sabnoor', email:'sabnoor@gmail.com'},
    {id:3, name:'Sabila', email:'sabila@gmail.com'},
]

app.get('/users', (req, res)=>{
    res.send(users);
})

//Data setting[create] to server with API
app.post('/users',(req, res)=>{
    console.log('users post method');
    console.log(req.body);
    const newUser = req.body;
    newUser.id = users.length+1; //create user id
    // add data to the database
    users.push(newUser);
    res.send(newUser);
})


//create connection between port and app and saying to awake always in the port.

app.listen(port,() =>{
    console.log(`Users Server runing on port ${port}`)
})