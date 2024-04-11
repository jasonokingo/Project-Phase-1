// document.addEventListener("DOMContentLoaded", () => {
//     const characterList = document.getElementById("characters")//select an element with the id characters and stores it in the characterList variable.
// })// Create an eventlistener that loads the DOM content

// let seriesCharacters = [];// Create an empty array seriesCharacters to store the fetched characters from the API.

// //Creates an asynchronous function fetchCharacters to fetch character data from the API.
// async function fetchCharacters() {
// //We use fetch which fetches data from the Rick and Morty API using the fetch function.
//     const response = await fetch('https://rickandmortyapi.com/api/character');
// //Gives response data into JSON format and stores it in the data variable.
//     const data = await response.json();
// // assigns the array of characters from the API response to the seriesCharacters variable.
//     seriesCharacters = data.results;
// // Function to Show the characters
//     showCharacters();
// }
//This line defines the showCharacters function to display characters on the webpage.
function showCharacters() {
    const charactersInformation = document.getElementById('characters');
    charactersInformation.innerHTML = ''; //Clears any existing character information.

    seriesCharacters.forEach(character => {// loops over each character in the seriesCharacters array.
        const characterDiv = createCharacterDiv(character);//Create a new div element for each character using the createCharacterDiv function.
        charactersInformation.appendChild(characterDiv);//This line appends the character div to the charactersInformation element
    });
}
//The createCharacterDiv function to create a div element for a character
function createCharacterDiv(character) {
    const characterDiv = document.createElement('div');//Create a new div element for the character.
    characterDiv.classList.add('character');

    const img = document.createElement('img');//Set the source attribute of the image element to the character's image URL.
    img.src = character.image;
    img.alt = character.name;

    const name = document.createElement('p');//Create a new paragraph element for the character's name
    name.textContent = character.name;

    img.addEventListener('click', (event) => {//Adds a click event listener to the image element to show the character's details when clicked.
        event.stopPropagation();
        showCharacterDetails(character);
    });

    const deleteBton = document.createElement('button');//Create a new button element for deleting a character.
    deleteBton.textContent = 'Delete';
    deleteBton.addEventListener('click', (event) => {//Adds a click event listener to the delete button to delete a character when clicked.
        event.stopPropagation();
        deleteCharacter(character);
    });

    characterDiv.appendChild(img);//This line appends the image element to the character div.
    characterDiv.appendChild(name);//This line appends the name paragraph element to the character div.
    characterDiv.appendChild(deleteBton);//This line appends the delete button to the character div.

    return characterDiv;//Returns the character div.
}

function deleteCharacter(characterToDelete) {//This line defines the deleteCharacter function to delete a character from the seriesCharacters array.
    seriesCharacters = seriesCharacters.filter(character => character !== characterToDelete);//This line filters out the character to delete from the seriesCharacters array.
    showCharacters();//Calls the showCharacters function to update the displayed characters on the webpage after deleting.
}
// Function to search for a character
function searchCharacter() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const character = seriesCharacters.find(char => char.name.toLowerCase() === searchTerm);
    
    if (character) {
        showCharacterDetails(character);
    } else {
        alert('Character not found');
    }
}
// Function to display character details
function showCharacterDetails(character) {
    const showName = document.getElementById('Name');
    const showSpecies = document.getElementById('Species');
    const showStatus = document.getElementById('Status');
    const showLocation = document.getElementById('Location');

    showName.textContent = character.name;
    showSpecies.textContent = `Species: ${character.species}`;
    showStatus.textContent = `Status: ${character.status}`;
    showLocation.textContent = `Location: ${character.location.name}`;

    const showCharacterDetailsDiv = document.getElementById('characterDetails');
    showCharacterDetailsDiv.style.display = 'block'; // Display the details
}
// Function to add a new character
function addCharacter(name, image, species, status, location) {
    const newCharacter = { name, image, species, status, location };
    seriesCharacters.push(newCharacter);
    showCharacters();
}

// Listen for form submission to add a new character
document.getElementById('addCharacterForm').addEventListener('submit', function(event) {
    event.preventDefault(); //This line prevents the default form submission behavior.
    const name = document.getElementById('newCharacterName').value;
    const image = document.getElementById('newCharacterImage').value;
    const species = document.getElementById('newCharacterSpecies').value;
    const status = document.getElementById('newCharacterStatus').value;
    const location = document.getElementById('newCharacterLocation').value;

    addCharacter(name, image, species, status, location);

    //This line resets the form fields after adding a new character.
    this.reset();
});
//This line calls the fetchCharacters function to fetch and display characters when the page is loaded.
fetchCharacters();

