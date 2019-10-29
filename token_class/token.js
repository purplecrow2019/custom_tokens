// const Data = require('./data');
// const Tokenizer = require('./tokenizer');


module.exports = class Token{
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
// class Token {
//     constructor(type, value) {
//         this.type = type;
//         this.value = value;
//         // this.meta = null;
//     }
// }


// let data = Data.data;


// function tokenize(str) {
//     let results_array = [];
//     let modified_str = str.replace(/\s+/g, "");
//     let split_str_array = modified_str.split('');
//     console.log(split_str_array);

//     split_str_array.forEach((char, i) => {
//         // console.log(char);
//         let charData = getCharData(char);
//         // console.log(charData);
//         results_array.push(charData);

//     });

//     return results_array;

// }

// function getCharData(char) {
//     if (isDigit(char)) {
//         return new Token('Digit', char);
//     }
//     else if (isComma(char)) {
//         return new Token('Comma', char);
//     }
//     else if (isLeftParenthesis(char)) {
//         return new Token('lp', char);
//     }
//     else if (isRightParenthesis(char)) {
//         return new Token('rp', char);
//     }
//     else if (isLetter(char)) {
//         return new Token('Letter', char);
//     }
//     else if (isOperator(char)) {
//         return new Token('Operator', char);
//     }

//     else {
//         return new Token('unknown', char);
//     }

// }




// function isDigit(char) {
//     return /\d/.test(char);
// }

// function isComma(char) {
//     return (char === ",");
// }

// function isLeftParenthesis(char) {
//     return (char === "(");
// }

// function isRightParenthesis(char) {
//     return (char === ")");
// }

// function isOperator(char) {
//     return /\+|-|\*|\/|\^|/.test(char)
// }

// function isLetter(char) {
//     return /[a-z]/i.test(char);
// }


// let tokens = Tokenizer.standardTokenize('sin(x) + log(x)');


// function getTokenType(buff_type, token_type) {
//     if (token_type == 'lp') {
//         return 'Function';
//     }
//     else if (buff_type === 'Digit') {
//         return 'Literal';
//     }
//     else if (buff_type === 'Letter') {
//         return 'Variable';
//     }
//     else {
//         return buff_type;
//     }

// }


// function getTokenMeta(token_value, token_type) {
//     // console.log(token_type);
//     if (data[token_type] != null && typeof data[token_type] != undefined) {
//         // console.log(' i am inside some real function')
//         let functionTypes = Object.keys(data[token_type]);
//         // console.log(functionTypes);
//         for (let i = 0; i < functionTypes.length; i++) {
//             if (data[token_type][functionTypes[i]].includes(token_value)) {
//                 // console.log(' i have found my function type');
//                 return functionTypes[i];
//                 break;
//             }
//         }

//     } else {
//         return token_type;
//     }
// }



// let buff_arr = [];
// let buff_type = null;
// let complete_token = [];
// tokens.forEach((token, index) => {
//     if (buff_type == null) {
//         buff_type = token.type;
//         buff_arr.push(token.value);
//     }
//     else if (token.type == buff_type) {
//         buff_arr.push(token.value);
//     }
//     else {

//         let token_value = buff_arr.join('');
//         let token_type = getTokenType(buff_type, token.type);
//         let token_meta = getTokenMeta(token_value, token_type);

//         complete_token.push(new CompleteToken(token_type, token_value, token_meta));
//         buff_type = token.type;
//         buff_arr = [];
//         buff_arr.push(token.value);
//     }

// });


// complete_token.push(
//     new CompleteToken(
//         getTokenType(buff_type, null),
//         buff_arr.join(""),
//         getTokenMeta(getTokenType(buff_type, null), buff_arr.join(""))
//     )
// );


// console.log(complete_token);


