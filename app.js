
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
        // let iterator = Pooler.ObjectMap.values();
        // //practice on map
        // for(const val of iterator){
        //     if(val.Active == false){
        //         val.Active = true;
        //         val.Id = characters;
        //         return val;
        //     }
        // }
        return new Character(characters);
    }
}

let Manager = new GameManager();
let Spawner = new CharacterSpawner(); 
let Pooler = new ObjectPooler();
$(document).ready(function(){
    //start
    textToType = randomString();
    Manager._numberOfSpawn +=1;
    Pooler.Pool(Spawner.Spawn(textToType));
    textarea.value ="";
    
    //N update
    setInterval(function(){ 
        textToType = randomString();
        Manager._numberOfSpawn +=1;
        Pooler.Pool(Spawner.Spawn(textToType));
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
        //if value is in object pooler 
        // if(Pooler.ObjectMap.has(value)){
        //     if(Pooler.ObjectMap.get(value).Active){
        //         Pooler.ObjectMap.get(value).Active = false;
        //         //remove element
        //         document.getElementById(value).remove();
        //         console.log("Correct!");
        //     }
        //    else{
        //         console.log("Wrong!");
        //    }
        // }else{
        //     console.log("Wrong!");
        // }

        
        // console.log(Pooler.ObjectSet);
        for(const obj of Pooler.ObjectSet.values()){
            if(obj.Id == value && obj.Active){
                obj.Active = false;
                console.log("correct!");
                break;
            }
            console.log(obj.Id);
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