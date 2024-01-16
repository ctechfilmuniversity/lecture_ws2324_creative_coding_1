'use strict';

const termsGood = ['good', 'better', 'nice', 'awesome', 'kitten', 'happy'];
const termsBad = ['bad', 'worse', 'Voldemort', 'dead', 'kill', 'sad'];

function spellChecker(spell, good, evil, 
                        // TODO 1: Explain the following line. What is it in regard to the
                        // spellChecker function and how does it work?
                        wrong = () => console.log('This is not a proper spell.'))
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

// TODO 5: Re-write the above function call so that it uses as arguments arrow functions while keeping exactly the same output

//ANSWERS
//TODO 1: The line "wrong = () => console.log('This is not a proper spell.'))" is an arrow function passed in as a parameter to the function "spellChecker".
//The empty brackets () indicate that the function takes in no parameters. The arrow => indicates the body of the function, that which is exectued, which is a console log in this case. 
//The function "wrong" is called if neither the if nor the else if statement evaluates to true. 

//TODO 2: 
//The line "return terms.map(term => str.includes(term)).includes(true);" returns an array of 'true' and 'false' values, with each binary value corresponding to the according element "term",
//evaluating as "true" if the term was found in "str", otherwise "false". The expression ".includes(true)" checks whether at least one "true" value is in the resulting array, i.e. checking whether at least one 
//term was found in "str". If not, the function returns "false".

//TODO 4: 
spellChecker('Make everything nice!', function (spell) {console.log("Doing the magic:", spell)}, function () {console.log('This spell is against the rules. Please evaluate your morals.')});

//TODO 5: 
spellChecker('Make everything nice!', (spell) => console.log('Doing the magic:', spell), () => console.log('This spell is against the rules. Please evaluate your morals.'));

// spellChecker('Supercalifragilisticexpialidocious!', doTheMagic, denyTheMagic, omen);
// spellChecker('Give me a kitten!', doTheMagic, denyTheMagic);
// spellChecker('Praise Voldemort!',  doTheMagic, denyTheMagic);
// spellChecker('Voldemort is awesome and kill that kitten!', doTheMagic, denyTheMagic);