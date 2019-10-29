const string = '17."int_(0)^( pi/4)(dx)/(1+sin x)'

// removing the question number from the question
// console.log(string.match(/^\"?\d{0,2}\./g))





function standardTokenize(str) {
    let results_array = [];
    let modified_str = str.replace(/\s+/g, " ");
    let split_str_array = modified_str.split('');
    split_str_array.forEach((char, i) => {
        let charData = getCharData(char);
        results_array.push(charData);
    });
    console.log('this is the tokens in split array');
    // console.log(results_array);
    return results_array;
}   



function getCharData(char){
    if(isDigit(char)){
        return 'digit';
    }
    else if(isComma(char)){
        return 'char';
    }
    else if (isLeftParenthesis(char)){
        return 'lp';
    }
    else if(isRightParenthesis(char)){
        return 'rp';
    }
    else if (isLetter(char)) {
        return 'Letter';
    }
    else if(isOperator(char)){
        return 'Operator';
    }    
    else if(isSpace(char)){
        return 'Space';
    }
    else if(isUnderScore(char)){
        return 'Underscore';
    }
    else if (isDot(char)) {
        return 'Dot';
    }
    else if(isSpecialCharacter(char)){
        return 'SpecialCharacter';
    }
    else{
        return 'UNKNOWN';
    }
}



function isDigit(char) {
    return /\d/.test(char);
}

function isComma(char) {
    return (char === ",");
}

function isLeftParenthesis(char) {
    return (char === "(");
}

function isRightParenthesis(char) {
    return (char === ")");
}

function isOperator(char) {
    return /\+|-|\*|\//.test(char)
}

function isLetter(char) {
    return /[a-z]/i.test(char);
}

function isSpace(char){
    return /\s/i.test(char)
}

function isSpecialCharacter(char){
    return /[!@#$%&{_}^|<>\.\"]/.test(char);
}

function isDot(char){
    return /\./.test(char)
}

function isUnderScore(char){
    return /_/.test(char)
}
// Login where you need to combine things with the operators then , be clear 

console.log(standardTokenize(string));


// Vectors dot
// . 
// a.b  ---- 1.2
// numbers*