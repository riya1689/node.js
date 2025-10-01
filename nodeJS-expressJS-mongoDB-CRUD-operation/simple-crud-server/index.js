/**
 * 1. packagejson install
 * 2. npm i express cors mongodb
 * 3. packagejson e check koro sob install hoyeche ki na
 * 4. server index.js set up
 * 
 */

const express = require('express');            //1.express jeta install korechi seta set holo
const { MongoClient, ServerApiVersion } = require('mongodb');          //9 rquire mongodb atlas in our code
const cors = require('cors');        //6
const app = express();        //2. express er ekti app baniye fela 
const port = process.env.PORT || 5000;       //3.port define

// middleware 7
app.use(cors()); //7
app.use(express.json());//8. json data niye kaj korar somoy

const uri = "mongodb+srv://riyaSimpleTest:A9xSMt1aLAhU3Ugt@cluster0.veagudg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";//10 set password and username

//10.(mongoDB connection handle) Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//11. async function add

async function run(){
    try{
        await client.connect();
        const database = client.db('usersdb');
        const userCollection = database.collection('users');
        app.get('/users', async(req, res) =>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/users',async(req, res)=>{
            console.log('data in the server', req.body);
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        await client.db('admin').command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
run().catch(console.dir)

//pass :A9xSMt1aLAhU3Ugt
//user :riyaSimpleTest

app.get('/', (req, res)=>{            //4.response from backend
    res.send('Simple CRUD server running');
});

app.listen(port,() =>{ //5
    console.log(`Simple CRUD server running on,${port}`)
})

//funtion declare type1
/*
function run(){

}
run()
*/
//funtion declare type2
// async function run(){
//     await
// }
// run().catch(console.log /**console.dir*/)  // catch use to catch any error

//function declare type3
// const run =async()=>{
//     await
// }
// run().catch(console.log);

//function declare type4
// try{

// }
// catch{
//     //for handle error
// }

//function declare type5
// try{

// }
// catch{

// }
// finally{  // finally will execute must

// }

