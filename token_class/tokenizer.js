const  TokenChecker = require('./tokenChecker');
const  Token = require('./token');

module.exports = class Tokenizer{

    constructor(){}

    static standardTokenize(str) {
        let results_array = [];
        let modified_str = str.replace(/\s+/g, " ");
        let split_str_array = modified_str.split('');
        split_str_array.forEach((char, i) => {
            let charData = this.getCharData(char);
            results_array.push(charData);
        });
        // console.log('this is the tokens in split array');
        // console.log(results_array);
        return results_array;
    }


    static getCharData(char) {
        if (TokenChecker.isDigit(char)) {
            return new Token('Number', char);
        }
        else if(TokenChecker.isSpace(char)){
            return new Token('Delimiter',char)
        }
        else if (TokenChecker.isComma(char)) {
            return new Token('Comma', char);
        }
        else if (TokenChecker.isLeftParenthesis(char)) {
            return new Token('lp', char);
        }
        else if (TokenChecker.isRightParenthesis(char)) {
            return new Token('rp', char);
        }
        else if (TokenChecker.isLetter(char)) {
            return new Token('Letter', char);
        }
        else if (TokenChecker.isOperator(char)) {
            return new Token('Operator', char);
        }
        else if(TokenChecker.isSpecialCharacter(char)){
            return new Token('Special Character',char);
        }
        else {
            return new Token('unknown', char);
        }



}

    static whiteSpaceTokenizer(str){
        return str.split(' ');
    }

    static NormalTokenize(str){
        return str.split('');
    }

}