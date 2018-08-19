
let textarea = document.getElementById("interactiveTextArea");
let level = 5;
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let textToType;

$(document).ready(function(){
    textToType = randomString();
    textarea.value ="";
    console.log(textToType);
    //keypress
    $(textarea).keypress(function(e){
        if(e.which == 13){
            let content = this.value;
            let lastLine = content.substr(content.lastIndexOf("\n")+1);
            console.log(lastLine + " " + textToType);
            checkAnswer(lastLine);
        }
      
    });

    function checkAnswer(value){
        if(value == textToType){
            console.log("Correct!");
        }else{
            console.log("Wrong!");
        }
    }

    function randomString(){
        let arr=[];
        for(let i=0; i<level; i++){
           arr.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }
        return arr.join('');
     
    }

});