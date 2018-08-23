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
    let spawnIntervalId;
    let timerIntervalId;
    let testCase = ["AbCde","AxCxx","qwert","qxert"];
    //let i =0; //check how many instance of function is running

    //set start program
    onStart();
    spawner.Spawn(testCase[0]);
    spawner.Spawn(testCase[1]);
    spawner.Spawn(testCase[2]);
    spawner.Spawn(testCase[3]);
    //main
    function startMainInterval(){
        spawnIntervalId = setInterval(function(){
            if(!paused){
                //i += 1;
                //console.log("instanceeu " + i);
                textToType = randomString();
                manager._numberOfSpawn +=1;
                spawner.Spawn(textToType);
            } 
            
        }, manager.GameSpeed);
            
            //timer 
        timerIntervalId =  setInterval(function(){
            if(timer.Start == true){
                timer.CountDown();
                document.getElementById("timer").children[1].
                textContent = (timer.Minutes < 10? "0":"") + "" + timer.Minutes + ":" + (timer.Seconds <10?"0":"") + timer.Seconds;
            }
        // console.log(timer.Minutes + ":" + timer.Seconds);
        },1000);
    }
    function stopMainInterval(){
        if(spawnIntervalId != null){
            clearInterval(spawnIntervalId);
            clearInterval(timerIntervalId);
            spawnIntervalId = 0;
            timerIntervalId = 0;
        }
            
    }
    let keyLog = [];
  
    //keypress
    $(textarea).keyup(function(e){
        if(e.which == 8){
            console.log("8");
            if(keyLog.length > 0){
                for(let item of pooler.ObjectSet.values()){
                    for(let i=0; i<keyLog.length; i++){
                        if(item.Id.charAt(i) == keyLog[i]){
                            highLightText(item.Id,keyLog.length-1,"#535353", 400, 1.2);
                        }
                    }
                }
                keyLog.pop();
            }
        }
    });
    $(textarea).keypress(function(e){
       
        if(e.which == 13){
            let content = this.value;
            let lastLine = content.substr(content.lastIndexOf("\n")+1);
            console.log("input: " + lastLine);
            keyLog = [];
            checkAnswer(lastLine);
        }

        if((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 49 && e.which<=57)){
            // console.log("code " + e.which);
            //console.log("pushing " + String.fromCodePoint(e.which));
            keyLog.push(String.fromCodePoint(e.which));
            for(let item of pooler.ObjectSet.values()){
                for(let i=0; i<keyLog.length; i++){
                    if(item.Id.substr(0, keyLog.length) == keyLog.join('')){
                        highLightText(item.Id,i,"green", 900, 1.5);
                    }else{
                        highLightText(item.Id,i,"#535353", 400, 1.2);
                    }
                }
            }
            console.log(keyLog.join(''));
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
    function highLightText(elementId, index, mycolor, font_weight, font_size)
    {
        // console.log("WUT? " + elementId);
        let objectElement = document.getElementById(elementId);
        let span = objectElement.children[index]; //get p.span
        span.style.color = mycolor;
        span.style.fontWeight = font_weight;
        span.style.fontSize = font_size + "em";
    }

    //DOM events
    $("#ui-control-play").click(function() {
        paused = paused == true? false : true;
        timer.Start = timer.Start == true? false:true;
        console.log(paused + " "+ timer.Start);
        
       stopMainInterval();
       startMainInterval();
        
       
    });
});