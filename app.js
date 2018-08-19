
let textarea = document.getElementById("interactiveTextArea");
let level = 5;
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let textToType;

class GameManager{
    constructor(){
        this._numberOfSpawn = 0;
        this._gameSpeed = 3000;
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
        for(const obj of Pooler.ObjectSet.values()){
            if(obj.Active == false){
                obj.Active = true;
                obj._id = characters;
                _obj = obj;
                break;
            }
            // console.log(obj.Id);
        }
        if(_obj == null){
            Pooler.Pool(new Character(characters));
        }
        //return new Character(characters);
    }
}

let Manager = new GameManager();
let Spawner = new CharacterSpawner(); 
let Pooler = new ObjectPooler();
$(document).ready(function(){
    //start
    textToType = randomString();
    Manager._numberOfSpawn +=1;
    Spawner.Spawn(textToType);
    textarea.value ="";
    
    //N update
    setInterval(function(){ 
        textToType = randomString();
        Manager._numberOfSpawn +=1;
        Spawner.Spawn(textToType);
    }, Manager.GameSpeed);
   

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
        console.log(Pooler.ObjectSet);
        for(const obj of Pooler.ObjectSet.values()){
            if(obj.Id == value && obj.Active){
                obj.Active = false;
                found = true;
                console.log("correct!");
                break;
            }
            // console.log(obj.Id);
        }
        if(!found){
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