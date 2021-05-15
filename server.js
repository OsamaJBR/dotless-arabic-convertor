const express = require('express');
const app = express();

const {convertToDotless} = require('./utils/convertToDotless')

app.use(express.json({limit: '3mb'}));
app.set('view engine', 'ejs');

app.post('/convert', async (req,res)=> {
    var text = req.body.text;
    if(!text) return res.status(400).send({error: 'Empty text.'})
    var newText = [];
    for (let index = 0; index < text.length; index++) {
        await convertToDotless(text[index], index, newText, text);
    }
    res.send({ "text": newText.join('') })
});

app.get('/', async (req, res) => {
    res.render('index');
});

// Server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`App listening on port ${port}!`));