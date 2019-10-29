const Data =require('../data');

module.exports = class Buffer{
    constructor(){}

static getTokenType(buff_type, token_type) {
    if (token_type == 'lp') {
        return 'Function';
    }
    if (buff_type === 'Digit') {
        return 'Literal';
    }
    else if (buff_type === 'Letter') {
        return 'Variable';
    }
    else {
        return buff_type;
    }
}

static getTokenMeta(token_value, token_type) {
    if (Data.data[token_type] != null && typeof Data.data[token_type] != undefined) {
        let functionTypes = Object.keys(Data.data[token_type]);
        for (let i = 0; i < functionTypes.length; i++) {
            if (Data.data[token_type][functionTypes[i]].includes(token_value)) {
                return functionTypes[i];
                break;
            }
        }
    } else {
        return token_type;
    }
}
}