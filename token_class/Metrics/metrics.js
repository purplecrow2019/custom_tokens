const training_datasets = require('./training_set/training_data');
const test_dataset = require('./training_set/test_data');
const training_set = training_datasets.training_data['maths_exps_data'];
const Tokenizer =require('../tokenizer');
const CustomTokenizer = require('../customTokenizer');
const Utility = require('../Utility/utility');




// let CustomTokens = CustomTokenizer.getCustomTokenised(tokens);



let training_docs_array = [];
for (let i = 0; i < training_set.length; i++) {

    let tokens = Tokenizer.standardTokenize(training_set[i]);
    console.log('token - start');
    console.log(tokens);
    console.log('token-end');
    let custom_tokens = CustomTokenizer.getCustomTokenised((tokens));
    console.log('custom tokens');
    console.log(custom_tokens);
    training_docs_array.push(Utility.customTokenGroupByKey(custom_tokens,'meta'));
}

console.log(training_docs_array);

let vocablury = [];


for (let i = 0; i < training_docs_array.length; i++) {
    for (let j = 0; j < training_docs_array[i].length; j++) {
        if (!vocablury.includes(training_docs_array[i][j])) {
            vocablury.push(training_docs_array[i][j]);
        }
    }
}
console.log(vocablury);
function getTfVectorizedDoc(doc) {
    let vector = new Array(vocablury.length).fill(0);
    vocablury.forEach((word, index) => {
        let occurences = getOccurences(word, doc)
        vector[index] = occurences;
    });
    return vector;
}


function getIdfVector(vocablury) {
    let vector = new Array(vocablury.length).fill(0);
    let total = training_docs_array.length;
    vocablury.forEach((word, index) => {
        let doc_appeareances = countApperancesInDocs(word);
        vector[index] = Math.log(total / doc_appeareances);
    });
    return vector;
}

function countApperancesInDocs(word) {
    let count = 0;
    for (let i = 0; i < training_docs_array.length; i++) {
        if (training_docs_array[i].includes(word)) {
            count++;
        }
    }
    return count;
}


function getOccurences(word, arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === word) {
            count++;
        }
    }
    return count;
}


let tf_vectors = [];
for (let j = 0; j < training_docs_array.length; j++) {
    tf_vectors.push(getTfVectorizedDoc(training_docs_array[j]));
}

let idfVector = getIdfVector(vocablury);



function getTfIdfVector(vector1, vector2) {
    let tfIdfVector = [];
    for (let i = 0; i < vector1.length; i++) {
        tfIdfVector.push(vector1[i] * vector2[i]);
    }
    return tfIdfVector;
}

let training_docs_vectors = [];
for (let n = 0; n < tf_vectors.length; n++) {
    training_docs_vectors.push(getTfIdfVector(tf_vectors[n], idfVector));

}

function getDistancesBetweenVectors(vector1, vector2) {
    let dist = 0;
    for (let i = 0; i < vector1.length; i++) {
        let small_dist = vector1[i] * vector2[i];
        dist += small_dist;
    }
    let cosine_distance = dist / (getVectorNorm(vector1) * getVectorNorm(vector2));
    return cosine_distance;

}

function getVectorNorm(vector) {
    let unit = 0;
    for (let i = 0; i < vector.length; i++) {
        unit += Math.pow(vector[i], 2);
    }
    return Math.sqrt(unit);
}


let test_data = test_dataset.test_data['data'];

for(let i=0;i<test_data.length;i++){
    let testString = test_data[i];
    let testStringToken = Utility.customTokenGroupByKey(CustomTokenizer.getCustomTokenised(Tokenizer.standardTokenize(testString)),'meta');
    let test_tf_vector = getTfVectorizedDoc(testStringToken);
    let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector);

    let similar_results = getSimilarMatches(test_tfidf_vector,training_docs_vectors);
    console.log(similar_results);
    // let similarity_score = getDistancesBetweenVectors(test_tfidf_vector, training_docs_vectors[2]);

}



function getSimilarMatches(test_vector , trained_vector_array){
    let matches_array = [];
    for(let k=0;k<trained_vector_array.length;k++){
        let match_obj = {};
        match_obj['string'] = training_set[k]; 
        match_obj['score'] = getDistancesBetweenVectors(test_vector,trained_vector_array[k]);
        matches_array.push(match_obj);
    }
    
    return matches_array.sort((a,b)=>{return a.score < b.score});
    
}


// let testString = "i love my country very much";
// let testStringToken = Tokenizer.whiteSpaceTokenizer(testString);
// let test_tf_vector = getTfVectorizedDoc(testStringToken);

// let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector);

// console.log(getDistancesBetweenVectors(test_tfidf_vector, training_docs_vectors[2]));




// console.log(getDistancesBetweenVectors(tfIdfVector4, tfIdfVector2));
// console.log(getDistancesBetweenVectors(tfIdfVector4, tfIdfVector3));