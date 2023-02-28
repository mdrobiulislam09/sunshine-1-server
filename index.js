const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middle-ware usersunshine1 XiWZWxwFyglcedqE
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://usersunshine1:XiWZWxwFyglcedqE@cluster11.p3hrjaz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('sunshine').collection('photo-service');
        const reviewCollection = client.db('sunshine').collection('comments');

        app.get('/photo-service', async (req, res) => {
            const query = {};
            const option = await serviceCollection.find(query).toArray();
            res.send(option);
        })
        app.post('/photo-service', async(req, res) => {
            const user = req.body;
            const result = await serviceCollection.insertOne(user);
            res.send(result)
        })

        app.get('/photo-service/:id', async (req, res) => {
            const id = req.params.id;
            const quey = {_id: new ObjectId(id)}
            const service = await serviceCollection.findOne(quey);
            res.send(service)
        })

        app.post('/comments', async(req, res) => {
            const user = req.body;
            const result = await reviewCollection.insertOne(user);
            res.send(result)
        })

        app.get('/comments', async (req, res) => {
            console.log(req.query.email)
            let query = {};
            if(req.query.email){
                query = {
                    address: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const comment = await cursor.toArray();
            res.send(comment)
        })

        app.delete('/comments/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.log);


app.get('/', (req, res) =>{
    res.send('server is ok')
});

app.listen(port, () =>{
    console.log(`running port ${port}`)
});