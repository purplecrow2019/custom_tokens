module.exports = class CompleteToken {
    constructor(type, value, meta) {
        this.type = type;
        this.value = value;
        this.meta = meta;
    }
    
    static getMeta(){
        return this.meta;
    }
    static getType(){
        return this.type;
    }
    static getValue(){
        return this.value;
    }
}