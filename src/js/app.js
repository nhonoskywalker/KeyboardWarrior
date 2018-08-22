import {GameManager, ObjectPooler, GameObject, Character, CharacterSpawner, Timer} from './myClass';




$(document).ready(function(){
    //enable
    let textarea = document.getElementById("interactiveTextArea");
    let level = 5;
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let textToType;
    let paused = true;
    //init
    let manager = new GameManager();
    let pooler = new ObjectPooler();
    let spawner = new CharacterSpawner(pooler); 
    let timer = new Timer(200);
    //set start program
    onStart();

    function main(){
       let i =0;
          //update
        if(!paused){
            setInterval(function(){ 
                i += 1;
                console.log("instanceeu " + i);
                textToType = randomString();
                manager._numberOfSpawn +=1;
                spawner.Spawn(textToType);
            }, manager.GameSpeed);
        }
        //timer 
        if(timer.Start == true){
                setInterval(function(){
                    timer.CountDown();
                    document.getElementById("timer").children[1].
                    textContent = (timer.Minutes < 10? "0":"") + "" + timer.Minutes + ":" + (timer.Seconds <10?"0":"") + timer.Seconds;
                // console.log(timer.Minutes + ":" + timer.Seconds);
                },1000);
        }
    }
  
   
    //keypress
    $(textarea).keypress(function(e){
        if(e.which == 13){
            let content = this.value;
            let lastLine = content.substr(content.lastIndexOf("\n")+1);
            console.log("input: " + lastLine);
            checkAnswer(lastLine);
        }
    });

    function checkAnswer(value){
        let found = false;
        console.log(pooler.ObjectSet);
        for(const obj of pooler.ObjectSet.values()){
            if(obj.Id == value && obj.Active){
                obj.Active = false;
                found = true;
                document.getElementById(obj.Id).remove();
                manager.HitIncrease();
                document.getElementById("hit").children[1].textContent = manager.Hit;
                console.log("correct!");
                break;
            }
            // console.log(obj.Id);
        }
        if(!found){
            manager.MissIncrease();
            document.getElementById("miss").children[1].textContent = manager.Miss;
            console.log("wrong!");
        }
    }

    function randomString(){
        let arr=[];
        for(let i=0; i<level; i++){
           arr.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }
        return arr.join('');
     
    }

    function onStart(){
        timer.Start = false;
        paused = true;
        // textToType = randomString();
        // manager._numberOfSpawn +=1;
        // spawner.Spawn(textToType);
        textarea.value ="";
        document.getElementById("timer").children[1].
        textContent = (timer.Minutes < 10? "0":"") + "" + timer.Minutes + ":" + (timer.Seconds <10?"0":"") + timer.Seconds;
    }
    //DOM events
    $("#ui-control-play").click(function() {
        paused = paused == true? false : true;
        timer.Start = timer.Start == true? false:true;
        console.log(paused + " "+ timer.Start);
        
        //call main to 
        main();
       
    });
});