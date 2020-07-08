const BufferParser = require('./Buffers/buffer');
const CompleteToken = require('./completeToken');


// let openCloseTokens = [
//     {   opening:'|',closing:'|'   },
//     {   opening:'[',closing:']'   }
// ];

let opening_tokens = ['|','['];
let closing_tokens = ['|',']'];
module.exports = class CustomTokenizer{

    constructor(){}

    static getCustomTokenised(tokens) {
        let buff_arr = [];
        let buff_type = null;
        let complete_token = [];
        tokens.forEach((token, index) => {
            console.log(token);
            if (buff_type == null){
                buff_type = token.type;
                buff_arr.push(token.value);
            }
            else if (token.type == buff_type){
                buff_arr.push(token.value);
            }
            else if(token.value == '_' ){
                if(buff_arr.join('') == 'int'){
                    let token_type = buff_type;
                    complete_token.push(new CompleteToken(token_type,'int_','definite_integration'));   
                    buff_arr=[];
                    buff_type=null;
                }
            }
            else if(token.value == 'f'){
                // console.log('i am in the f block');
                // console.log(tokens[index+1].value);
                if(tokens[index+1].value == '('){
                    complete_token.push(new CompleteToken(buff_type, 'f()', 'Function'));    
                }
                buff_arr = []; 
                buff_type = null;
            }
            else if (token.value == ':') {
                // console.log('i am in the f block');
                // console.log(tokens[index+1].value);
                if (tokens[index - 1].value == 'f' | tokens[index - 1].value == 'g' | tokens[index - 1].value == 'h'   ) {
                    complete_token.push(new CompleteToken(buff_type, 'f:', 'Function'));
                }
                buff_arr = [];
                buff_type = null;
            }
            else if (token.value == '^') {
                if (buff_arr.join('') == 'e') {
                    let token_type = buff_type;
                    complete_token.push(new CompleteToken(token_type, 'e', 'exponential'));
                    buff_arr = [];
                    buff_type = null;
                }
            }
            // else if(token.value == '-'){
            //     if(buff_type  != 'Delimiter'){
            //         // console.log( ' i am in the edge case now');
            //         console.log(complete_token);
            //         let prev_token = complete_token[complete_token.length -1];
                    
            //         // console.log(prev_token);
            //     }
            // }
            else {
                        // ---- token contains the new token came
                        // ---- token comes  and token value
                if(buff_type == 'lp' || buff_type == 'rp' || buff_type == 'Delimiter'){
                    // console.log('removing the code for lp and rp');
                    let token_type = buff_type;
                    complete_token.push(new CompleteToken(token_type, 'lp', 'd'));
                    buff_arr = [];
                    buff_type = null;
                }
                
                else{
                    let token_value = buff_arr.join('');
                // let token_type = BufferParser.getTokenType(buff_type, token.type);
                    let token_type = buff_type;
                    let token_meta = BufferParser.getTokenMeta(token_value, token_type);
                // if(!token_type == 'Delimiter'){
                    if (token_meta == 'differential_element' && complete_token[complete_token.length - 2]['value'] == 'd' && complete_token[complete_token.length - 1]['value'] =='/') {
                        // console.log( complete_token[complete_token.length-1]['value'] );
                        // console.log( complete_token[complete_token.length-2]['value'] );
                        complete_token.pop();
                        complete_token.pop();
                        token_value ='dfrn';
                        token_meta ='Differentiate'
                        complete_token.push(new CompleteToken(token_type, token_value, token_meta));   

                        // console.log('hey we can do operations here not a prob');
                    }else{
                    complete_token.push(new CompleteToken(token_type, token_value, token_meta));   
                    }
                } 
                buff_type = token.type;
                buff_arr = [];
                buff_arr.push(token.value);
                
            }

        });

        complete_token.push(
            new CompleteToken(
                BufferParser.getTokenType(buff_type, null),
                buff_arr.join(''),
                BufferParser.getTokenMeta(buff_arr.join(''), BufferParser.getTokenType(buff_type, null))
            )
        );

        return complete_token;
    }


}