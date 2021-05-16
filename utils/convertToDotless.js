var {replacables, punctuations, tanween, tashkeel} = require('../lettersConfig')

exports.convertToDotless= async function(char, index, array, text){
    if(process.env.DEBUG) {
        console.log(`letter=${char}  code=${escape(char)}  willBeReplacedWith=${replacables[escape(char)]} view=${unescape(replacables[escape(char)])}`);
    }
    // check Qaf case
    switch(escape(char)){
        // Qaf ق letter at the end of word or on the middle
        case '%u0642':
            if ( 
                // if next char is arabic letter
                escape(text[index+1]).startsWith('%u06') 
                // and not a punctuations
                && !punctuations.includes(escape(text[index+1])) 
                // and not a tanween
                && !tanween.includes(escape(text[index+1]))
                // if there is tashkeel, check index+2 is space or not
                && ( tashkeel.includes(escape(text[index+1])) && !['%20', '%0A', '%09', '.', '!'].includes(escape(text[index+2])) )
            )  {
                // then write it as Fah ف 
                array.push(unescape('%u06A1'));
            }
            // other than that, write it as ق 
            else array.push(unescape('%u066F'))
            break;
        // Yaa ياء 
        case '%u064A':
            if ( 
                // if next char is arabic letter
                escape(text[index+1]).startsWith('%u06') 
                // and not a punctuations
                && !punctuations.includes(escape(text[index+1])) 
                // and not a tanween
                && !tanween.includes(escape(text[index+1]))
                // if there is tashkeel, check index+2 is space or not
                && ( tashkeel.includes(escape(text[index+1])) && !['%20', '%0A', '%09', '.', '!'].includes(escape(text[index+2])) )
            )  {
                // then write it as Bah ب 
                array.push(unescape('%u066E'));
            }
            // other than this, write it as ي
            else array.push(unescape('%u0649'));
            break;
        default:
            array.push(replacables[escape(char)] ? unescape(replacables[escape(char)]) : char)
    }
}