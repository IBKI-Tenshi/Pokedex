

let BASE_URL = "https://pokeapi.co/api/v2/";

let actuallShownPokemon = [];



async function init() {
    await loadData("pokemon?limit=100000&offset=0");
    await loadActullShownPokemon();
    renderLittleContainer();

}

async function loadData(path) {

    let data = await fetch(BASE_URL + path + ".json");
    let dataToJson = await data.json();
    return dataToJson.results;
}

async function loadActullShownPokemon() {
    let allPokemon = await loadData("pokemon?limit=100000&offset=0");
    for (let i = 0; i < 10; i++) {
        actuallShownPokemon.push(allPokemon[i]);
    }
    console.log(actuallShownPokemon);
}

function renderPokemonName() {
    actuallShownPokemon.forEach(pokemon => {
        console.log(pokemon.name);
    });

    document.getElementById('pokemon_name').innerHTML = actuallShownPokemon[0].name;
}

async function renderPokemonUrl() {
    actuallShownPokemon.forEach(pokemon => {
        console.log(pokemon.url);
    });
}

async function renderLittleContainer() {
    // Hole das Element, in das die Container eingefügt werden sollen
    let allContent = document.getElementById('all_content');
    
    // Lösche den bestehenden Inhalt, falls vorhanden
    allContent.innerHTML = '';

    // Iteriere über das actuallShownPokemon Array
    actuallShownPokemon.forEach(pokemon => {
        // Rufe die Funktion getLittleContainer() auf und füge den HTML-Code hinzu
        let pokemonContainer = getLittleContainer(pokemon);
        allContent.innerHTML += pokemonContainer; // Füge den HTML-String hinzu
    });
}
