module.exports = class Utility{
    constructor(){}
    static customTokenGroupByKey(arr_of_objs, key) {
            let arr = [];
            for (let i = 0; i < arr_of_objs.length; i++) {
                arr.push(arr_of_objs[i][key]);
            }
            return arr;
        }
}