// document.addEventListener('DOMContentLoaded', documentEvents  , false);

// function myAction(input) { 
//     console.log("input value is : " + input.value);
//     alert("The entered data is : " + input.value);
//     // do processing with data
//     // you need to right click the extension icon and choose "inspect popup"
//     // to view the messages appearing on the console.
// }

// function documentEvents() {    
//   document.getElementById('ok_btn').addEventListener('click', 
//     function() { myAction(document.getElementById('name_textbox'));
//   });

//   // you can add listeners for other objects ( like other buttons ) here 
// }

import {default as convertToDotless } from './modules/convertToDotless.js';
$(document).ready(function () {
    $("#clear").click(function () {
        document.getElementById('textarea').value = '';
        document.getElementById('converted__data').innerHTML = '';
        document.getElementById('after__converted__container').classList.remove('show__class');
    });

    $("#convert").click(function () {
      var text = document.getElementById('textarea').value
      if(!text) console.log("Empty text")
      var newText = [];
      for (let index = 0; index < text.length; index++) {
           convertToDotless(text[index], index, newText, text);
      }
      console.log("device control succeeded");
      document.getElementById('converted__data').innerHTML = newText.join('');
      document.getElementById('after__converted__container').classList.add('show__class');

    });

    $("#copy__text").click(function () {
        var copyText = document.getElementById("converted__data");
        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        document.getElementById('toast__message').classList.add('show__class')
        setTimeout(() => {
            document.getElementById('toast__message').classList.remove('show__class')
        }, 2000);
    });
});