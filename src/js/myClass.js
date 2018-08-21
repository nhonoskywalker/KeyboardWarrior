export class GameManager{
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
export class GameObject{
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
export class Character extends GameObject{
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
export class ObjectPooler{
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
export class CharacterSpawner{
    constructor(pooler){
      this._pooler = pooler;
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
      
        for(const obj of this._pooler.ObjectSet.values()){
            if(obj.Active == false){
                obj.Active = true;
                obj._id = characters;
                _obj = obj;
                break;
            }
            // console.log(obj.Id);
        }
        if(_obj == null){
            this._pooler.Pool(new Character(characters));
        }
        //return new Character(characters);
    }
}
export class Timer{
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
