const express = require('express');
const helmet = require('helmet');

const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(helmet( {
    contentSecurityPolicy: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('24')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.use(function(req,res){
    res.status(404);
    res.render('404');
});


app.listen(process.env.PORT || 3000, () => {
})