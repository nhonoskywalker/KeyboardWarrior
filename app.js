
let textarea = document.getElementById("interactiveTextArea");
let level = 5;
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let textToType;
let paused =false;
class GameManager{
    constructor(){
        this._numberOfSpawn = 0;
        this._gameSpeed = 500;
        this._hit = 0;
        this._miss = 0;
    }
    get Hit(){
        return this._hit;
    }
    HitIncrease(){
        this._hit++;
    }
    get Miss(){
        return this._miss;
    }
    MissIncrease(){
        this._miss++;
    }
    get GameSpeed(){
        return this._gameSpeed;
    }
    set GameSpeed(value){
        this._gameSpeed = value;
    }
    get numberOfSpawn(){
        return this.numberOfSpawn;
    }
    set numberOfSpawn(numberOfSpawn){
        this._numberOfSpawn = numberOfSpawn;
    }
}
class GameObject{
    constructor(){
        this._active = true;
        this._name = "gameObject";
    }
    get Active(){
        return this._active;
    }
    set Active(value){
        this._active = value;
    }
    get Name(){
        return this._name;
    }
    set Name(value){
        this._name = value;
    }
}
class Character extends GameObject{
    constructor(id){
        super();
        this._id = id;
    }
    get Id(){
        return this._id;
    }
    set Id(value){
        this.id =value;
    }
}
class ObjectPooler{
    constructor(){
        this._objectsMap = new Map();
        this._setObject = new Set();
        this._arrObject = [];
    }
    get ArrayObject(){
        return this._arrObject;
    }
    set ArrayObject(value){
        this._arrObject = value;
    }
    get ObjectSet(){
        return this._setObject;
    }
    set ObjectSet(value){
        this._setObject = value;
    }
    get ObjectMap(){
        return this._objectsMap;
    }
    set ObjectMap(value){
        this._objectsMap = value;
    }
    Pool(character){
        //this._objectsMap.set(character.Id, character);
        this._setObject.add(character);
    }
}
class CharacterSpawner{
    constructor(){
      
    }
   
     Spawn(characters) {
    
        let para = document.createElement("p");
        let node = document.createTextNode(characters);
        para.classList.add("character-game-object");
        para.id = characters;
        para.appendChild(node);

        let element = document.getElementById("main-display");
        element.appendChild(para);

        let _obj = null;
        for(const obj of pooler.ObjectSet.values()){
            if(obj.Active == false){
                obj.Active = true;
                obj._id = characters;
                _obj = obj;
                break;
            }
            // console.log(obj.Id);
        }
        if(_obj == null){
            pooler.Pool(new Character(characters));
        }
        //return new Character(characters);
    }
}

class Timer{
    constructor(countDownInSec){
        this._tempCountDownInsec = countDownInSec;
        this._countDownInSec = countDownInSec;
        this._minutes = Math.floor(countDownInSec / 60);
        this._seconds = countDownInSec - (this._minutes * 60);
        this._start = false;
    }

    CountDown(){
        //setInterval(function(){
            this._countDownInSec = this._countDownInSec < 0? 0:this._countDownInSec -= 1;
            if(this._countDownInSec >= 0){
                this._minutes = Math.floor(this._countDownInSec / 60);
                this._seconds = this._countDownInSec - (this._minutes * 60);
            }else{
                this._start = false;
            }
           
            //console.log(this._countDownInSec);

        //},1000);
    }
    Start(){
        this._start = true;
    }
    Pause(){
        this._start = false;
    }
    Reset(){
        this._start = false;
        this._countDownInSec = this._tempCountDownInsec;
        this._minutes = Math.floor(countDownInSec / 60);
        this._seconds = countDownInSec - (this._minutes * 60);
    }
    get Minutes(){
        return this._minutes < 0? 0:this._minutes;
    }
    get Seconds(){
        return this._seconds < 0? 0:this._seconds;
    }
    
}

let manager = new GameManager();
let spawner = new CharacterSpawner(); 
let pooler = new ObjectPooler();
let timer = new Timer(4);
$(document).ready(function(){
    //start
    timer.Start = true;
    textToType = randomString();
    manager._numberOfSpawn +=1;
    spawner.Spawn(textToType);
    textarea.value ="";
    
    //N update
    paused = true;
    if(!paused){
        setInterval(function(){ 
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

});