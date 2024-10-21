async function init() {
    await loadData("pokemon?limit=100000&offset=0");
    await loadActualShownPokemon();
    await renderLittleContainer();
}

// Lade Pokémon-Daten
async function loadData(path) {
    let data = await fetch(BASE_URL + path + ".json");
    let dataToJson = await data.json();
    return dataToJson.results;
}

// Pokémon- und Typ-Daten laden
async function loadActualShownPokemon() {
    let allPokemon = await loadData("pokemon?limit=100000&offset=0");
    for (let i = 0; i < 30; i++) {
        actualShownPokemon.push(allPokemon[i]);
        await loadPokemonTypes(allPokemon[i].url);  // Typen für jedes Pokémon laden
    }
    loadIdInArray();
}

async function loadIdInArray() {
    for (let i = 0; i < actualShownPokemon.length; i++) {
        let pokemonId = actualShownPokemon[i].url.split("/")[6]; // Extrahiere die Pokémon-ID
        actualShownPokemon[i].Id = pokemonId; // Füge die ID als neues Feld hinzu
    }

    console.log(actualShownPokemon); // Überprüfe die aktualisierten Daten
}

// Pokémon-Typen aus der API abrufen
async function loadPokemonTypes(url) {
    let pokemonData = await fetch(url).then(res => res.json());    
    let types = pokemonData.types.map(typeInfo => typeInfo.type.name);
    actualShownPokemonTypes.push(types);  // Typen als Array speichern
}

// Container für alle Pokémon rendern
async function renderLittleContainer() {
    let allContent = document.getElementById('all_content');
    allContent.innerHTML = '';

    // Iteriere über die Pokémon und füge den HTML-Container hinzu
    actualShownPokemon.forEach((pokemon, index) => {
        let pokemonContainer = getLittleContainer(pokemon, img_URL, actualShownPokemonTypes[index]);
        allContent.innerHTML += pokemonContainer;
    });
}

function toggle_overlay() {
    let overlay = document.getElementById('overlay');

    if (overlay.classList.contains('d_none')) {
        overlay.classList.remove('d_none');
    } else {
        overlay.classList.add('d_none');
    }
}

async function renderBigContainer(pokemonId, pokemonName, types) {
    let overlayContent = document.getElementById('overlay');
    overlayContent.innerHTML = '';

    renderInfoContent(pokemonId - 1, 1)


    
    let pokemonContainerBig = getBigContainer(pokemonId, pokemonName, types);
    overlayContent.innerHTML = pokemonContainerBig;
}

async function renderInfoContent(path, infoID) {

    console.log(path);
    

    let infoDataToJson = await loadInfoContent(path);

    console.log(infoDataToJson);

    getInfoContent(infoDataToJson, infoID);
}

async function loadInfoContent(path) {
    let infoData = await fetch(actualShownPokemon[path].url);
    let infoDataToJson = await infoData.json();

    return infoDataToJson;
}

async function renderInfoMain(infoDataToJson) {

    let height = infoDataToJson.height;
    let weight = infoDataToJson.weight;
    let baseExperience = infoDataToJson.base_experience;
    let abilities = infoDataToJson.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    let infoContent = document.getElementById('info_content');


    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentMain(height, weight, baseExperience, abilities);
}

async function renderInfoStats(infoDataToJson) {

    let HP = infoDataToJson.stats[0].base_stat;
    let ATK = infoDataToJson.stats[1].base_stat;
    let DEF = infoDataToJson.stats[2].base_stat;
    let specATK = infoDataToJson.stats[3].base_stat;
    let specDEF = infoDataToJson.stats[4].base_stat;
    let Speed = infoDataToJson.stats[5].base_stat;

    let infoContent = document.getElementById('info_content');
    console.log(infoContent);

    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentStats(HP, ATK, DEF, specATK, specDEF, Speed);
}

async function renderInfoEvoChain(infoDataToJson) { 
    let actualSpeciesURL = infoDataToJson.species.url;

    console.log(actualSpeciesURL);
    
    let EvoChainURL = await fetch(actualSpeciesURL).then(res => res.json());

    console.log(EvoChainURL);

    console.log(EvoChainURL.evolution_chain.url);
    

    let EvoChainData = await fetch(EvoChainURL.evolution_chain.url).then(res => res.json());
    
    console.log(EvoChainData);
    console.log(EvoChainData.chain.species.name);
    console.log(EvoChainData.chain.evolves_to);
    console.log(EvoChainData.chain.evolves_to[0]);
    console.log(EvoChainData.chain.evolves_to[0].species.name);

    if (EvoChainData.chain.evolves_to[0].evolves_to.length >= 1) {
        console.log(EvoChainData.chain.evolves_to[0].evolves_to[0]);
        console.log(EvoChainData.chain.evolves_to[0].evolves_to[0].species.name);
    }

    let pokemonId = EvoChainData.chain.species.url.split("/")[6];
    // let pokemonId = pokemon.url.split("/")[6];

    console.log(EvoChainData.chain);
    
    console.log(pokemonId);
    
    let evo1 = EvoChainData.chain.species.name;
    let evo2 = EvoChainData.chain.evolves_to[0].species.name;
    let evo3 = EvoChainData.chain.evolves_to[0].evolves_to[0].species.name;

    let infoContent = document.getElementById('info_content');
    console.log(infoContent);

    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentEvoChain(img_URL, evo1, evo2, evo3)


}

async function getInfoContent(infoDataToJson, infoId) {


    let selector = infoId;

    if (selector == 1) {
        renderInfoMain(infoDataToJson);
    } else {
        if (selector == 2) {
            renderInfoStats(infoDataToJson);
        } else {
            renderInfoEvoChain(infoDataToJson);
        }
    }

}

function previousPokemon(pokemonId) {
    let currentPokemonIndex = pokemonId - 1;
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
    } else {
        currentPokemonIndex = actualShownPokemon.length - 1;
    }
    showPokemonInOverlay(currentPokemonIndex);
}

function nextPokemon(pokemonId) {
    let currentPokemonIndex = pokemonId - 1;
    if (currentPokemonIndex < actualShownPokemon.length - 1) {
        currentPokemonIndex++;
    } else {
        currentPokemonIndex = 0;
    }
    showPokemonInOverlay(currentPokemonIndex);
}

function showPokemonInOverlay(index) {
    let selectedPokemon = actualShownPokemon[index];
    let selectedPokemonTypes = actualShownPokemonTypes[index];
    let pokemonId = selectedPokemon.url.split("/")[6];
    let pokemonName = selectedPokemon.name;
    let types = selectedPokemonTypes;

    renderBigContainer(pokemonId, pokemonName, types);
}


