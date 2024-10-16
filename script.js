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
    for (let i = 0; i < 10; i++) {
        actualShownPokemon.push(allPokemon[i]);
        await loadPokemonTypes(allPokemon[i].url);  // Typen für jedes Pokémon laden
    }
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

async function renderBigContainer(backgroundColor, pokemonId, pokemonName, types) {
    let overlayContent = document.getElementById('overlay');
    overlayContent.innerHTML = '';

    let pokemonContainerBig = getBigContainer(backgroundColor, pokemonId, pokemonName, types);
    overlayContent.innerHTML = pokemonContainerBig;

    renderInfoContent(pokemonId - 1)
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
    let backgroundColor = typeBackground[selectedPokemonTypes[0]] || "#FFF";
    let pokemonId = selectedPokemon.url.split("/")[6];
    let pokemonName = selectedPokemon.name;
    let types = selectedPokemonTypes;

    renderBigContainer(backgroundColor, pokemonId, pokemonName, types);
}

async function renderInfoContent(path) {

    let infoDataToJson = await loadInfoContent(path);

    getInfoContent(infoDataToJson);
}

async function loadInfoContent(path) {
    let infoData = await fetch(actualShownPokemon[path].url);
    let infoDataToJson = await infoData.json();

    console.log(infoDataToJson);

    return infoDataToJson;
}

async function renderInfoMain(infoDataToJson) {

    let height = infoDataToJson.height;
    let weight = infoDataToJson.weight;
    let baseExperience = infoDataToJson.base_experience;
    let abilities = infoDataToJson.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    let infoContent = document.getElementById('info_content');
    console.log(infoContent);

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

async function renderInfoEvoChain(infoDataToJson) { }






async function getInfoContent(infoDataToJson, FunctionID) {

    // let selector = 1;

    let selector = FunctionID;

    if (selector = 1) {
        renderInfoMain(infoDataToJson);
    } else {
        if (selector = 2) {
            renderInfoStats(infoDataToJson);
        } else {
            renderInfoEvoChain(infoDataToJson);
        }
    }


}


