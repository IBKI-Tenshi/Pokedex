let BASE_URL = "https://pokeapi.co/api/v2/";
let img_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let actuallShownPokemon = [];
let actuallShownPokemonTypes = [];

async function init() {
    await loadData("pokemon?limit=100000&offset=0");
    await loadActullShownPokemon();
    await renderLittleContainer();
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
        // Lade die Typen für jedes Pokémon
        await loadPokemonTypes(allPokemon[i].url); // Hier wird die URL für jedes Pokémon verwendet
    }
    console.log(actuallShownPokemon);
    console.log(actuallShownPokemonTypes); // Zeige die Typen im Konsolen-Log an
}

async function loadPokemonTypes(url) {
    // warten auf die info der url dann res=response erwarten -> res= info der url als json
    let pokemonData = await fetch(url).then(res => res.json());
    // .map erstellt die erhaltene info als array. info ist ein array der typen. diese werden mit einem "," getrennt falls es mehrere gibt
    let types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ");
    actuallShownPokemonTypes.push(types);
}

async function renderLittleContainer() {
    let allContent = document.getElementById('all_content');
    allContent.innerHTML = '';

    // Iteriere über das actuallShownPokemon Array
    actuallShownPokemon.forEach((pokemon, index) => {
        // Rufe die Funktion getLittleContainer() auf und füge den HTML-Code hinzu
        let pokemonContainer = getLittleContainer(pokemon, img_URL, actuallShownPokemonTypes[index]);
        allContent.innerHTML += pokemonContainer; // Füge den HTML-String hinzu
    });
}

