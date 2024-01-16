'use strict';

const termsGood = ['good', 'better', 'nice', 'awesome', 'kitten', 'happy'];
const termsBad = ['bad', 'worse', 'Voldemort', 'dead', 'kill', 'sad'];

function spellChecker(spell, good, evil, 
                        // TODO 1: Explain the following line. What is it in regard to the
                        // spellChecker function and how does it work?
                        
                        // The following line describes the function "wrong" and prints an error message.
                        // Its a function parameter of "spellChecker" and uses in it own syntax an anonymous 
                        // and arrow funcition. It can be called inside the "spellChecker" function.
            
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

    // The following line uses the "map" function on the array "terms" to check if any of the specified 
    // terms in the array are present in the given string "str". Then it returns true if at least one 
    // term is found, and false otherwise.
    
    return terms.map(term => str.includes(term)).includes(true);
}


function omen() 
{
    let magicalNumber = Math.floor(Math.random() * 101);
    let omen = 'No matter what, the answer is ' + magicalNumber + '!';
    console.log(omen);
}


// TODO 4: Re-write the above function call so that it uses as arguments anonymous functions while keeping exactly the same output

// TODO 5: Re-write the above function call so that it uses as arguments arrow functions while keeping exactly the same output

// I re-wrote, so it uses both: anonymous functions and arrow functions. To do that, I included the functions of the parameters above.

spellChecker('Make everything nice!', 

    doTheMagic = spell => console.log('Doing the magic:', spell);,
    denyTheMagic = () => console.log('This spell is against the rules. Please evaluate your morals.');
    );



// spellChecker('Supercalifragilisticexpialidocious!', doTheMagic, denyTheMagic, omen);
// spellChecker('Give me a kitten!', doTheMagic, denyTheMagic);
// spellChecker('Praise Voldemort!',  doTheMagic, denyTheMagic);
// spellChecker('Voldemort is awesome and kill that kitten!', doTheMagic, denyTheMagic);