'use strict';

const termsGood = ['good', 'better', 'nice', 'awesome', 'kitten', 'happy'];
const termsBad = ['bad', 'worse', 'Voldemort', 'dead', 'kill', 'sad'];

function spellChecker(spell, good, evil, 
                        // TODO 1: Explain the following line. What is it in regard to the
                        // spellChecker function and how does it work?

                        // Its an anonymous functions defined in the syntax of an arrow function.
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
    //The following line returns something to the call of the function hasTerm. Its input "terms" is an array, therefore the function can be & is also called. 
    // What It´does is, to call a function for each item/term in the array. Which is the function .includes which checks if the input str characters are included 
    //in any of the individual term elements, if so it reurns true. So map returns an array of true's and false's, that array is then checked by another includes function
    //which checks if any of these are true, if so it returns true. So the return type of hasTerm is a single bool.  
    //
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





//spellChecker('Make everything nice!', doTheMagic, denyTheMagic);

// TODO 4: Re-write the above function call so that it uses as arguments anonymous functions while keeping exactly the same output

spellChecker(
    'Make everything nice!', 
    function (spell) { console.log('Doing the magic:', spell)},  
    function () { console.log('This spell is against the rules. Please evaluate your morals.')}
    );


// TODO 5: Re-write the above function call so that it uses as arguments arrow functions while keeping exactly the same output

spellChecker(
    'Make everything nice!', 
    (spell) => { console.log('Doing the magic:', spell)},  
    () => console.log('This spell is against the rules. Please evaluate your morals.')
    );


spellChecker('Supercalifragilisticexpialidocious!', doTheMagic, denyTheMagic, omen);
// spellChecker('Give me a kitten!', doTheMagic, denyTheMagic);
// spellChecker('Praise Voldemort!',  doTheMagic, denyTheMagic);
// spellChecker('Voldemort is awesome and kill that kitten!', doTheMagic, denyTheMagic);