const training_datasets = require('./training_set/training_data');
const test_dataset = require('./training_set/test_data');
const training_set = training_datasets.training_data['maths_exps_data'];
const Tokenizer = require('../tokenizer');
const CustomTokenizer = require('../customTokenizer');
const Utility = require('../Utility/utility');




// let CustomTokens = CustomTokenizer.getCustomTokenised(tokens);


//  --------------------  Generate a training vector first  ----------------------//

function generateTrainingDocArray(filter){
    let training_docs_array = [];
    for (let i = 0; i < training_set.length; i++) {
        let tokens = Tokenizer.standardTokenize(training_set[i]);
        let custom_tokens = CustomTokenizer.getCustomTokenised((tokens));
        training_docs_array.push(Utility.customTokenGroupByKey(custom_tokens, filter));
    }
    return training_docs_array;
}



// console.log(training_docs_array);


// ----------------------  Generate Vocablury from the Training Docs ------------------- //



function getVocabluryFromTrainingDocs(training_docs_array){
    let vocablury = [];
    for (let i = 0; i < training_docs_array.length; i++) {
        for (let j = 0; j < training_docs_array[i].length; j++) {
            if (!vocablury.includes(training_docs_array[i][j])) {
                vocablury.push(training_docs_array[i][j]);
            }
        }
    }
    return vocablury;
}



// console.log(vocablury);

// -------------------- Get A tf Vector for a data row in dataset ------------------- //

function getTfVectorizedDoc(doc,vocablury) {
    let vector = new Array(vocablury.length).fill(0);
    vocablury.forEach((word, index) => {
        let occurences = getOccurences(word, doc)
        vector[index] = occurences;
    });
    return vector;
}


// ------------------ BOW Model Helper Function ----------------------//

function countApperancesInDocs(word, training_doc_array) {
    let count = 0;
    for (let i = 0; i < training_doc_array.length; i++) {
        if (training_doc_array[i].includes(word)) {
            count++;
        }
    }
    return count;
}



// ------------------------  Get a Global Idf Vector for all ------------------ //

function getIdfVector(vocablury,training_doc_array) {
    let vector = new Array(vocablury.length).fill(0);
    let total = training_doc_array.length;
    vocablury.forEach((word, index) => {
        let doc_appeareances = countApperancesInDocs(word,training_doc_array);
        vector[index] = Math.log(total / doc_appeareances);
    });
    return vector;
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



function getTfVectorsArray(training_docs_array,vocablury){
    let tf_vectors = [];
    for (let j = 0; j < training_docs_array.length; j++) {
        tf_vectors.push(getTfVectorizedDoc(training_docs_array[j],vocablury));
    }
    return tf_vectors;
}

// let idfVector = getIdfVector(vocablury);



function getTfIdfVector(vector1, vector2) {
    let tfIdfVector = [];
    for (let i = 0; i < vector1.length; i++) {
        tfIdfVector.push(vector1[i] * vector2[i]);
    }
    return tfIdfVector;
}

// let training_docs_vectors = [];
// for (let n = 0; n < tf_vectors.length; n++) {
//     training_docs_vectors.push(getTfIdfVector(tf_vectors[n], idfVector));

// }


// --------------------------- Cosine Similarity Formula Calculator Function ------------- //


function getDistancesBetweenVectors(vector1, vector2) {
    let dist = 0;
    for (let i = 0; i < vector1.length; i++) {
        let small_dist = vector1[i] * vector2[i];
        dist += small_dist;
    }
    let cosine_distance = dist / (getVectorNorm(vector1) * getVectorNorm(vector2));
    return cosine_distance;

}


// -------------------- Cosine Similarity Helper Function -----------------------------//

function getVectorNorm(vector) {
    let unit = 0;
    for (let i = 0; i < vector.length; i++) {
        unit += Math.pow(vector[i], 2);
    }
    return Math.sqrt(unit);
}


// let test_data = test_dataset.test_data['data'];

// for (let i = 0; i < test_data.length; i++) {
//     let testString = test_data[i];
//     let testStringToken = Utility.customTokenGroupByKey(CustomTokenizer.getCustomTokenised(Tokenizer.standardTokenize(testString)), 'meta');
//     let test_tf_vector = getTfVectorizedDoc(testStringToken);
//     let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector);

//     let similar_results = getSimilarMatches(test_tfidf_vector, training_docs_vectors);
//     console.log(similar_results);
//     // let similarity_score = getDistancesBetweenVectors(test_tfidf_vector, training_docs_vectors[2]);

// }



function getSimilarMatches(test_vector, trained_vector_array) {
    let matches_array = [];
    for (let k = 0; k < trained_vector_array.length; k++) {
        let match_obj = {};
        match_obj['string'] = training_set[k];
        match_obj['score'] = getDistancesBetweenVectors(test_vector, trained_vector_array[k]);
        matches_array.push(match_obj);
    }

    return matches_array;
    // return matches_array.sort((a, b) => { return a.score < b.score });

}


// let testString = "i love my country very much";
// let testStringToken = Tokenizer.whiteSpaceTokenizer(testString);
// let test_tf_vector = getTfVectorizedDoc(testStringToken);

// let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector);

// console.log(getDistancesBetweenVectors(test_tfidf_vector, training_docs_vectors[2]));




// console.log(getDistancesBetweenVectors(tfIdfVector4, tfIdfVector2));
// console.log(getDistancesBetweenVectors(tfIdfVector4, tfIdfVector3));



// -------------------------- Logic For Weights ----------------------- //
let training_docs_array1 = generateTrainingDocArray('meta');
// console.log(training_docs_array);
let vocablury1 = getVocabluryFromTrainingDocs(training_docs_array1);
// console.log(vocablury);

let tfVectors1 = getTfVectorsArray(training_docs_array1,vocablury1);
// console.log(tfVectors);
let idfVector1 = getIdfVector(vocablury1,training_docs_array1);

let training_docs_vectors1 = [];
for (let n = 0; n < tfVectors1.length; n++) {
    training_docs_vectors1.push(getTfIdfVector(tfVectors1[n], idfVector1));
}

let test_data = test_dataset.test_data['data'];

// console.log(training_docs_vectors);
let similar_results1;
for (let i = 0; i < test_data.length; i++) {
    let testString = test_data[i];
    let testStringToken = Utility.customTokenGroupByKey(CustomTokenizer.getCustomTokenised(Tokenizer.standardTokenize(testString)), 'meta');
    let test_tf_vector = getTfVectorizedDoc(testStringToken,vocablury1);
    let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector1);
    similar_results1 = getSimilarMatches(test_tfidf_vector, training_docs_vectors1);
    console.log(similar_results1);
}

// console.log(idfVector);

 ///    --------------- Generating 2nd Type of Metric -------------------- ////////
let training_docs_array2 = generateTrainingDocArray('value');
// console.log(training_docs_array2);
let vocablury2 = getVocabluryFromTrainingDocs(training_docs_array2);
// console.log(vocablury2);

let tfVectors2 = getTfVectorsArray(training_docs_array2,vocablury2);
// console.log(tfVectors2);
let idfVector2 = getIdfVector(vocablury2, training_docs_array2);
// console.log(idfVector2);

let training_docs_vectors2 = [];
for (let n = 0; n < tfVectors2.length; n++) {
    training_docs_vectors2.push(getTfIdfVector(tfVectors2[n], idfVector2));
}

// let test_data = test_dataset.test_data['data'];

console.log(training_docs_vectors2);
let similar_results2;
for (let i = 0; i < test_data.length; i++) {
    let testString = test_data[i];
    let testStringToken = Utility.customTokenGroupByKey(CustomTokenizer.getCustomTokenised(Tokenizer.standardTokenize(testString)), 'value');
    let test_tf_vector = getTfVectorizedDoc(testStringToken,vocablury2);
    let test_tfidf_vector = getTfIdfVector(test_tf_vector, idfVector2);
    similar_results2 = getSimilarMatches(test_tfidf_vector, training_docs_vectors2);
    console.log(similar_results2);
}



