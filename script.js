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

// Funktion, die die Typ-Bilder basierend auf den Typen anzeigt
function getTypeImages(types) {
    return types.map(type => `<img src="${typeImg_URL}${type}.png" alt="${type}">`).join(" ");
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
}

let currentPokemonIndex = 0; // Variable zum Speichern des aktuellen Pokémon-Index

// Zeige das vorherige Pokémon an
function previousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;  // Gehe zum vorherigen Pokémon
    } else {
        currentPokemonIndex = actualShownPokemon.length - 1;  // Springe zum letzten Pokémon
    }
    showPokemonInOverlay(currentPokemonIndex);  // Zeige das Pokémon im Overlay an
}

// Zeige das nächste Pokémon an
function nextPokemon() {
    if (currentPokemonIndex < actualShownPokemon.length - 1) {
        currentPokemonIndex++;  // Gehe zum nächsten Pokémon
    } else {
        currentPokemonIndex = 0;  // Springe zum ersten Pokémon
    }
    showPokemonInOverlay(currentPokemonIndex);  // Zeige das Pokémon im Overlay an
}

// Hilfsfunktion, um das Pokémon im Overlay zu zeigen
function showPokemonInOverlay(index) {
    let selectedPokemon = actualShownPokemon[index];
    let selectedPokemonTypes = actualShownPokemonTypes[index];
    let backgroundColor = typeBackground[selectedPokemonTypes[0]] || "#FFF"; // Nimm den ersten Typ für die Hintergrundfarbe
    let pokemonId = selectedPokemon.url.split("/")[6];
    let pokemonName = selectedPokemon.name;
    let types = selectedPokemonTypes;

    // Render das Pokémon mit der `renderBigContainer`-Funktion
    renderBigContainer(backgroundColor, pokemonId, pokemonName, types);
}
