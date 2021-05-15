exports.convertToDotless= async function(char, index, array, text, replacables){
    console.log(`letter=${char}  code=${escape(char)}  willBeReplacedWith=${replacables[escape(char)]} view=${unescape(replacables[escape(char)])}`)
    // check Qaf case
    
    switch(escape(char)){
        // Qaf ق letter at the end of word or on the middle
        case '%u0642':
            if(escape(text[index+1]).startsWith('%u06')) array.push(unescape('%u06A1'));
            else array.push(unescape('%u066F'))
            break;
        // Yaa ياء 
        case '%u064A':
            if(escape(text[index+1]).startsWith('%u06')) array.push(unescape('%u066E'));
            else array.push(unescape('%u0649'));
            break;
        default:
            array.push(replacables[escape(char)] ? unescape(replacables[escape(char)]) : char)
    }
}