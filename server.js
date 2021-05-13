const express = require('express');
const app = express();

var {replacables} = require('./lettersConfig')
const {asyncForEach} = require('./utils/asyncForEach')

app.use(express.json())

app.post('/convert', async (req,res)=> {
    var text = req.body.text;
    if(!text) return res.status(400).send({error: 'Empty text.'})
    var newText = [];
    await asyncForEach(text, async(char)=>{
        console.log(`letter=${char}  code=${escape(char)}  willBeReplacedWith=${replacables[escape(char)]} view=${unescape(replacables[escape(char)])}`)
        newText.push(replacables[escape(char)] ? unescape(replacables[escape(char)]) : char)
    });
    res.send(newText.join(''))
});


// Server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`App listening on port ${port}!`));