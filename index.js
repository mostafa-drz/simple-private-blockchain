const express = require('express');
const app = express();
const ejsLint = require("ejs-lint");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true,

}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
import Blockchain from './simpleChain';
const chain = new Blockchain();
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.post('/add-to-block', (req, res) => {
    try {
        chain.addBlock(req.body).then((value) => {
            return res.status(200).send(value);
        }).catch((err) => {
            return res.status(500).send(err);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/get-a-block/:id', (req, res) => {
    if (req.params.id < 0) {
        return res.status(400).send({
            error: {
                message: 'invalid block number'
            }
        })
    }
    try {
        chain.getBlock(req.params.id).then((value) => {
            res.status(200).send(value);
        }).catch((error) => {
            return res.status(500).send(error);
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/validate-a-block/:id', (req, res) => {
    if (req.params.id < 0) {
        return res.status(400).send({
            error: {
                message: 'invalid block number'
            }
        })
    }
    try {
        chain.validateBlock(req.params.id).then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            return res.status(400).send(error);
        })
    } catch (error) {
        console.log(error);
    }
});

app.get('/validate-the-chain', (req, res) => {
    try {
        chain.validateChain().then((result) => {
            res.status(200).send(result);
        }).catch((error) => {
            res.status(400).send(error);
        })
    } catch (error) {
        console.log(error);
    }
})
app.listen(process.env.PORT || 3003, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running....')
})