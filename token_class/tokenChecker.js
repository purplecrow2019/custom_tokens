module.exports = class tokenChecker{
    constructor(){}

    static isDigit(char) {
        return /\d/.test(char);
    }

    static isComma(char) {
        return (char === ",");
    }

    static isLeftParenthesis(char) {
        return (char === "(");
    }

    static isRightParenthesis(char) {
        return (char === ")");
    }

    static isOperator(char) {
        return /\+|-|\*|\/|\^|>|<|=/.test(char)
    }

    static isLetter(char) {
        return /[a-z]/i.test(char);
    }
    static isSpace(char){
        return /\s/i.test(char)
    }
    static isSpecialCharacter(char){
        return /[!@#$%&{_}|<>]/.test(char);
    }


}
     