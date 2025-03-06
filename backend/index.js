const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json('home')
});

const port = 5000 || process.env.PORT;

app.listen((port),()=>{
    console.log(`http://localhost:${port}`)
})