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
            console.log(value);
            res.status(200).send(value);
        }).catch((err) => {
            res.status(500).send(err);
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