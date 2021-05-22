import {replacables, punctuations, tanween, tashkeel} from './lettersConfig.js';


export default function(char, index, array, text){
    // if(process.env.DEBUG) {
    //     console.log(`letter=${char}  code=${escape(char)}  willBeReplacedWith=${replacables[escape(char)]} view=${unescape(replacables[escape(char)])}`);
    // }
    // check Qaf case
    switch(escape(char)){
        // Qaf ق 
        case '%u0642':
        // Yah ي
        case '%u064A':
        // Noon ن
        case '%u0646':
            if ( 
                // if next char is arabic letter
                escape(text[index+1]).startsWith('%u06') 
                // and not a punctuations
                && !punctuations.includes(escape(text[index+1])) 
                // and not a tanween
                && !tanween.includes(escape(text[index+1]))
                // if there is tashkeel, check index+2 is space or not
                && ( !tashkeel.includes(escape(text[index+1])) && !['%20', '%0A', '%09', '.', '!'].includes(escape(text[index+2])) )
            )  {
                // then write Qaf ق as dotless Fah ف  
                if(escape(char) == '%u0642') array.push(unescape('%u06A1'));
                // then write Yaah ي as dotless Bah ب 
                if(escape(char) == '%u064A') array.push(unescape('%u066E'));
                // then write Noon ن as dotless Bah ب 
                if(escape(char) == '%u0646') array.push(unescape('%u066E'));
            }
            else {
                // then write Qaf as dotless Qaf
                if(escape(char) == '%u0642') array.push(unescape('%u066F'));
                // then write Yaah ي as Aaa ى
                if(escape(char) == '%u064A') array.push(unescape('%u0649'));
                // then write Noon ن as dotless Noon 
                if(escape(char) == '%u0646') array.push(unescape('%u06BA'));
            }
            break;
        default:
            array.push(replacables[escape(char)] ? unescape(replacables[escape(char)]) : char)
    }
}

