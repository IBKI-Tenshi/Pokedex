

let BASE_URL = "https://pokeapi.co/api/v2/";

let img_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

let actuallShownPokemon = [];
let actuallShownPokemonTypes = [];


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

async function renderLittleContainer() {
    let allContent = document.getElementById('all_content');
    allContent.innerHTML = '';

    // Iteriere über das actuallShownPokemon Array
    actuallShownPokemon.forEach(pokemon => {
        // Rufe die Funktion getLittleContainer() auf und füge den HTML-Code hinzu
        let pokemonContainer = getLittleContainer(pokemon, img_URL);
        allContent.innerHTML += pokemonContainer; // Füge den HTML-String hinzu
    });
}
