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
const Blockchain = require('./simpleChain');
const chain = new Blockchain();
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.post('/add-to-block', (req, res) => {
    chain.addBlock(req.body).then(() => {
        res.status(200).send();
    }).catch((err) => {
        res.status(500).send(err);
    })
})
app.listen(process.env.PORT || 3003, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running....')
})