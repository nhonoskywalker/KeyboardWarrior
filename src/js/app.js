import {GameManager, ObjectPooler, GameObject, Character, CharacterSpawner, Timer} from './myClass';

$(document).ready(function(){
    let settings = {
        normalFontWeight: 400, 
        activeFontWeight: 900, 
        normalGameObjectCharacterColor: "#535353",
        activeGameObjectCharacterColor: "green",
        normalFontSize: 1.2,
        activeFontSize: 1.5,
        spawnSpeed: 3000,
        timerInSeconds: 200,
        maxNumOfCharacters: 5
    };
    
    //enable
    let textarea = document.getElementById("interactiveTextArea");
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let textToType;
    let paused = true;
    //init
    let manager = new GameManager();
    let pooler = new ObjectPooler();
    let spawner = new CharacterSpawner(pooler); 
    let timer = new Timer(settings.timerInSeconds);
    let spawnIntervalId;
    let timerIntervalId;
    let keyLog = [];
   
    //set start program
    onStart();
   
    //main
    function startMainInterval(){
        spawnIntervalId = setInterval(function(){
            if(!paused){
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
    
    //keypress
    $(textarea).keydown(function(e){
        backSpace(e, 37);
        backSpace(e, 39);
        if(e.keyCode === 8){
            //do not use backspace button function
            return false;
        }
        if(e.which == 37 || e.which == 39){
            this.value = this.value.substr(0,this.value.length-1);
            
        }
        if(e.which == 38 || e.which == 40){
            this.value = "";
            for(let item of pooler.ObjectSet.values()){
                for(let i=0; i<keyLog.length; i++){
                    //if keylog is greater
                    if(item.Id.substr(0, keyLog.length > settings.maxNumOfCharacters? settings.maxNumOfCharacters:keyLog.length) == keyLog.join('')){
                        highLightText(item.Id,i,settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                    }
                }
            }
            keyLog = [];
        }
    });

    
    $(textarea).keyup(function(e){
        // backSpace(e, 8);
        if(e.which == 37){
           //make caret always in the end of the text value
            this.selectionEnd = this.selectionEnd + 1;
            let del = this.value.substr(this.selectionEnd-1, 1);
            this.value = this.value.substr(0,this.value.length-1);
            this.selectionEnd = this.selectionEnd + 1;
            this.value += del;
        }
    });
    $(textarea).keypress(function(e){
       
        if(e.which == 13){
            let content = this.value;
            let lastLine = content.substr(content.lastIndexOf("\n")+1);
            checkAnswer(lastLine);
        }

        if((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 49 && e.which<=57)){
            try {
                keyLog.push(String.fromCodePoint(e.which));
                for(let item of pooler.ObjectSet.values()){
                    for(let i=0; i<keyLog.length && item.Active; i++){
                        if(item.Id.substr(0, keyLog.length) == keyLog.join('')){
                            highLightText(item.Id,i,settings.activeGameObjectCharacterColor, settings.activeFontWeight, settings.activeFontSize);
                        }else{
                            highLightText(item.Id,i,settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                        }
                    }
                }
                console.log(keyLog.join(''));
            }
            catch(err) {
                //game object dom child looked into pooler object set where its dom is already removed
                //or index is out of range
                //game will continue
                console.log(keyLog.join(''));
                console.log("ERROR");
                for(let item of pooler.ObjectSet.values()){
                    if(item.Active){
                        let _log = "";
                        for(let i=0; i<item.Id.length; i++){
                            _log += keyLog[i];
                        }
                        console.log("_log " + _log);
                        if(item.Id == _log){
                            for(let i=0; i<item.Id.length; i++){
                                highLightText(item.Id,i,settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                            }
                        }
                    }
                }
            }
        }
    });

    function backSpace(e, key){
        if(e.which == key){
            let content = textarea.value;
            //let lastLine = content.substr(content.lastIndexOf("\n")+1);
            if(keyLog.length > 0){
                //set game object dom last index to normal
                for(let item of pooler.ObjectSet.values()){
                    for(let i=0; i<keyLog.length; i++){
                        if(item.Id.substr(0, keyLog.length) == keyLog.join('')){
                            highLightText(item.Id,keyLog.length-1, settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                        }
                    }
                }
                keyLog.pop();
            }
            //set game object dom to active
            for(let item of pooler.ObjectSet.values()){
                for(let i=0; i<keyLog.length; i++){
                    if(item.Id.substr(0, keyLog.length) == keyLog.join('')){
                        highLightText(item.Id,i,settings.activeGameObjectCharacterColor, settings.activeFontWeight, settings.activeFontSize);
                    }
                }
            }
            
        }
    }
    function checkAnswer(value){
        let found = false;
        //console.log(pooler.ObjectSet);
        for(const obj of pooler.ObjectSet.values()){
            if(obj.Id == value && obj.Active){
                obj.Active = false;
                found = true;
                document.getElementById(obj.Id).remove();
                manager.HitIncrease();
                document.getElementById("hit").children[1].textContent = manager.Hit;
                keyLog = [];
                console.log("correct!");
                break;
            }
        }
        if(!found){
            manager.MissIncrease();
            document.getElementById("miss").children[1].textContent = manager.Miss;
            //set game object dom to normal 
            for(let item of pooler.ObjectSet.values()){
                if(keyLog.length <= item.Id.length){
                    if(item.Id.substr(0, keyLog.length) == keyLog.join('') && item.Active){
                        for(let i=0; i<keyLog.length; i++){
                            highLightText(item.Id,i,settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                        }
                    }
                }else{
                    let _log;
                    for(let i=0; i<item.Id.length; i++){
                        _log += keyLog[i];
                    }
                    if(item.Id == _log && item.Active){
                        for(let i=0; i<item.Id.length; i++){
                            highLightText(item.Id,i,settings.normalGameObjectCharacterColor, settings.normalFontWeight, settings.normalFontSize);
                        }
                    }
                }
                
              
            }
            console.log("wrong!");
        }
        //clear key log for new input line
        keyLog = [];
    }

   
    function randomString(){
        let arr=[];
        for(let i=0; i<settings.maxNumOfCharacters; i++){
           arr.push(characters.charAt(Math.floor(Math.random() * characters.length)));
        }
        return arr.join('');
    }
    function onStart(){
        timer.Start = false;
        paused = true;
        manager.GameSpeed = settings.spawnSpeed;
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
        //spawn first characeters
        if(!paused && timer.Start == true){
            textToType = randomString();
            manager._numberOfSpawn +=1;
            spawner.Spawn(textToType);
        }
       //restart intervals
       stopMainInterval();
       startMainInterval();
        
       
    });
});