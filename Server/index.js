//main starting point of the application
//node index.js za pokretanje u cmd

const express = require('express'); // slicno kao import
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const user = "salabajzer";
const pass = "kuckamjakuckastikuckamomi1001987";
const host = "88.99.81.54";
const p = "27017";
const db = "auth";

//Db Setup
//mongoose.connect('mongodb://username:password@host:port/database')
mongoose.connect(`mongodb://${user}:${pass}@${host}:${p}/${db}`); // kreira novu bazu pod imenom auth, ako se menja ime menja se ovde

//App Setup
//morgan je login FrimeWork
app.use(morgan('combined')); //svaki zahtev prolazi kroz morgan, zatim kroz bodyParser po default. Use ih predstavlja kao middlleware
app.use(cors()); //middlleware
app.use(bodyParser.json({ type: '*/*' }));//middlleware , analaizirace ih kroz json
app.get('/hello', function (req, res) {
  res.send('Hello World!')
})
router(app);


// komentar!!!


//Server Setup

const port = process.env.PORT || 3090; // ako je port definisan koristi taj port, ako nije koristi 3090
const server = http.createServer(app); // ucitava app na server
server.listen(port);
console.log('Server listening on: ', port);
