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
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.post('/add-to-block', (req, res) => {
    console.log(req.body);
})
app.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running....')
})