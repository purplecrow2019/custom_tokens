const Data = require('./data');
const Tokenizer = require('./tokenizer');
const Token = require('./token');
const CompleteToken = require('./completeToken');
const BufferParser = require('./Buffers/buffer');
const CustomTokenizer = require('./customTokenizer');
const _= require('lodash');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');




app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// let tokens = Tokenizer.standardTokenize("sin^(2)alpha+tan^(2)beta+sec^(2)gamma");
// let tokens = Tokenizer.standardTokenize('int_(-1)^(3/2)|x sin pi x|dx');
// let tokens = Tokenizer.standardTokenize('cos6x=32cos^(6)x-48cos^(4)x+18cos^(2)x-1')
// let tokens = Tokenizer.standardTokenize('(x^(2))/(3^(2))+(y^(2))/(b^(2))');
// let tokens = Tokenizer.standardTokenize('(sqrt(y))int(2+sin2x)/(1+cos2x)e^(x)dx');
// let tokens = Tokenizer.standardTokenize('f:a rarr b')
// let tokens =  Tokenizer.standardTokenize('(dy)/(dx)=(x+y)/(x-y)')
// let tokens = Tokenizer.standardTokenize('int_(1)^(2)(dx)/(x(1+2x)^(2))');



app.post('/tokenize',function(req,res){
    let tokens = Tokenizer.standardTokenize('(d)/(dx)[log(sec x+tan x)]');
    let CustomTokens = CustomTokenizer.getCustomTokenised(tokens);
    let responseData = {
        "meta": {
            "code": 200,
            "success": true,
            "message": "SUCCESS",
        },
        "data": CustomTokens
    }
    // res.send(CustomTokens);
    // console.log(CustomTokens);
});


app.listen(7000,()=>{
    console.log('app is listening at port 7000');     
})

// let tokens = Tokenizer.standardTokenize('(d)/(dx)[log(sec x+tan x)]');
//Note - multiplication via brackets has not been taken care here -- will need to see how it impacts resutls
// console.log(tokens);





// let CustomTokens = CustomTokenizer.getCustomTokenised(tokens);
// console.log(CustomTokens);




// console.log(CustomTokens[0].getMeta());
// console.log(_.groupBy(CustomTokens,'type'));node index.js
// console.log(CustomTokens[0]['type']);
// console.log(customTokenGroupByKey(CustomTokens,'value'));


// function getCustomTokenised(){

//     let buff_arr = [];
//     let buff_type = null;
//     let complete_token = [];
//     tokens.forEach((token, index) => {
//         if (buff_type == null) {
//             buff_type = token.type;
//             buff_arr.push(token.value);
//         }
//         else if (token.type == buff_type) {
//             buff_arr.push(token.value);
//         }
//         else {

//             let token_value = buff_arr.join('');
//             let token_type = BufferParser.getTokenType(buff_type, token.type);
//             let token_meta = BufferParser.getTokenMeta(token_value, token_type);

//             complete_token.push(new CompleteToken(token_type, token_value, token_meta));
//             buff_type = token.type;
//             buff_arr = [];
//             buff_arr.push(token.value);
//         }

//     });

//     complete_token.push(
//         new CompleteToken(
//             BufferParser.getTokenType(buff_type, null),
//             buff_arr.join(""),
//             BufferParser.getTokenMeta(BufferParser.getTokenType(buff_type, null), buff_arr.join(""))
//         )
//     );

//     return complete_token;    
// }



// console.log(getCustomTokenised(tokens));