//Linda Maas WS2324 - 2020-23-02

'use strict';

const termsGood = ['good', 'better', 'nice', 'awesome', 'kitten', 'happy'];
const termsBad = ['bad', 'worse', 'Voldemort', 'dead', 'kill', 'sad'];

// The Spell Checker take 3 parameters, the string to be checked (spell), a function to be called when the spell is good, and a function to be called when the spell is bad.
// A Spell is good if it has at least one of the terms from the termsGood array, and bad if it has at least one of the terms from the termsBad array.
function spellChecker(spell, good, evil, 
    
                       //This is a default parameter, if no function is passed as argument, this function will be called
                       // its an arrow function, which is a new way of writing functions in javascript, to make them shorter.
                       // the arrow function has no name, and it takes no parameters. It prints the message 'This is not a proper spell.'
                        wrong = () => console.log('This is not a proper spell.'))
{
    // This function takes the string as a parameter and also the array of bad terms to be checked. 
    // If the string contains at least one of the terms from the array, it returns the evil function. The evil function calls the denyTheMagic function.
    if (hasTerm(spell, termsBad)) {
        evil()
    }

    // If the string contains at least one of the terms from the good array, it returns the good function. The good function calls the doTheMagic function.
    else if (hasTerm(spell, termsGood)) {
        good(spell)
    }

    // If the string does not contain any of the terms from the good or bad arrays, it returns the wrong function. 
    //The wrong function prints the message 'This is not a proper spell.'

    else{ 
        wrong()
    };
}

// This function takes the string and the array of terms as parameters.
function hasTerm(str, terms)
{
    // it maps the array of terms to a boolean and checks if the string contains any of the terms.
    // term is a parameter of the function that is passed to the map function, and it is the current element of the array.
    // str is the string to be checked. it is defined in the spellChecker function.
    // includes is a method of the string object that checks if the string contains the term. Its a javascript method.
    // includes returns a boolean, true if the string contains the term, false if it does not.
    // The return if the function is a boolean
    
    return terms.map(term => str.includes(term)).includes(true);
}


// this function takes the spell as a parameter and prints the message 'Doing the magic: ' followed by the spell.


// this function prints the message 'This spell is against the rules. Please evaluate your morals.'
//function denyTheMagic() 
//{
   // console.log('This spell is against the rules. Please evaluate your morals.');
//}

//function doTheMagic(spell) 
//{
  //  console.log('Doing the magic: ' + spell);
//}

// this function prints the message 'No matter what, the answer is ' followed by a random number between 0 and 100.
function omen() 
{
    let magicalNumber = Math.floor(Math.random() * 101);
    let omen = 'No matter what, the answer is ' + magicalNumber + '!';
    console.log(omen);
}




// TODO 4: Re-write the above function call so that it uses as arguments anonymous functions while keeping exactly the same output
//spellChecker('Make everything nice!', function (spell) {console.log('Doing the magic:', spell)} , function () {console.log('This spell is against the rules. Please evaluate your morals.')});

// TODO 5: Re-write the above function call so that it uses as arguments arrow functions while keeping exactly the same output
spellChecker('Make everything nice!', (spell) => console.log('Doing the magic:', spell), () => console.log('This spell is against the rules. Please evaluate your morals.'));


//spellChecker('Supercalifragilisticexpialidocious!', doTheMagic, denyTheMagic, omen);
//spellChecker('Give me a kitten!', doTheMagic, denyTheMagic);
// spellChecker('Praise Voldemort!',  doTheMagic, denyTheMagic);
// spellChecker('Voldemort is awesome and kill that kitten!', doTheMagic, denyTheMagic);