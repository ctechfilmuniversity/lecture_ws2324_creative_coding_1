'use strict';

const termsGood = ['good', 'better', 'nice', 'awesome', 'kitten', 'happy'];
const termsBad = ['bad', 'worse', 'Voldemort', 'dead', 'kill', 'sad'];

function spellChecker(spell, good, evil, 
                        // TODO 1: Explain the following line. What is it in regard to the
                        // spellChecker function and how does it work?
                        wrong = () => console.log('This is not a proper spell.'))
                        
                        
                        // ANSWER: This line defines a default value for the 'wrong' parameter of the spellChecker function.
                        // If the 'wrong' parameter is not provided when calling the function, it will default to a function
                        // that logs 'This is not a proper spell.' to the console.
{
    if (hasTerm(spell, termsBad)) evil();
    else if (hasTerm(spell, termsGood)) good(spell);
    else wrong();
}

function hasTerm(str, terms)
{
    // TODO 2: Describe what the following line does
    // and how it works (consider all components)?
    return terms.map(term => str.includes(term)).includes(true);


    // ANSWER: This function checks if the input string 'str' contains any of the terms specified in the 'terms' array.
    // It uses the map function to create an array of boolean values, where each value represents whether 'str'
    // includes the corresponding term. The includes(true) part checks if at least one term was found in 'str'.

}

function doTheMagic(spell) 
{
    console.log('Doing the magic:', spell);
}

function denyTheMagic() 
{
    console.log('This spell is against the rules. Please evaluate your morals.');
}

function omen() 
{
    let magicalNumber = Math.floor(Math.random() * 101);
    let omen = 'No matter what, the answer is ' + magicalNumber + '!';
    console.log(omen);
}





spellChecker('Make everything nice!', doTheMagic, denyTheMagic);

// TODO 4: Re-write the above function call so that it uses as arguments anonymous functions while keeping exactly the same output
// ANSWER: 

spellChecker('Make everything nice!', 
function (spell) {console.log("Doing the magic:", spell)}, 
function () {console.log('This spell is against the rules. Please evaluate your morals.')}

);


// TODO 5: Re-write the above function call so that it uses as arguments arrow functions while keeping exactly the same output
// ANSWER:

spellChecker('Make everything nice!', (spell) => console.log('Doing the magic:', spell),
 () => console.log('This spell is against the rules. Please evaluate your morals.')
 );



// spellChecker('Supercalifragilisticexpialidocious!', doTheMagic, denyTheMagic, omen);
// spellChecker('Give me a kitten!', doTheMagic, denyTheMagic);
// spellChecker('Praise Voldemort!',  doTheMagic, denyTheMagic);
// spellChecker('Voldemort is awesome and kill that kitten!', doTheMagic, denyTheMagic);