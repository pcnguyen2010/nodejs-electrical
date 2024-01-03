const express = require('express');
const app = express();

app.use(express.static('image'));
app.use(express.static('css'));
app.use(express.static('script'));

//register view engine
app.set('view engine','ejs');
app.set('views','view');

app.get('/',(req,res) =>{
    res.render('index',{title: 'Electrical HVAC Plumbing'});
});

const PORT = process.env.PORT || 5900;

app.listen(PORT,() => console.log(`Sever started on ${PORT}`));