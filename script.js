async function init() {
    await loadData("pokemon?limit=100000&offset=0");
    await loadActualShownPokemon();
    await renderLittleContainer();
}

async function loadData(path) { // Lade Pokémon-Daten
    let data = await fetch(BASE_URL + path + ".json");
    let dataToJson = await data.json();
    return dataToJson.results;
}

async function loadActualShownPokemon() { // Pokémon- und Typ-Daten laden
    let allPokemon = await loadData("pokemon?limit=100000&offset=0");
    for (let i = 0; i < 20; i++) {
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
}

async function loadPokemonTypes(url) { // Pokémon-Typen aus der API abrufen
    let pokemonData = await fetch(url).then(res => res.json());
    let types = pokemonData.types.map(typeInfo => typeInfo.type.name);
    actualShownPokemonTypes.push(types);  // Typen als Array speichern
}

async function renderLittleContainer() { // Container für alle Pokémon rendern
    let allContent = document.getElementById('all_content');
    allContent.innerHTML = '';

    // Iteriere über die Pokémon und füge den HTML-Container hinzu
    actualShownPokemon.forEach((pokemon, index) => {
        let pokemonContainer = getLittleContainer(pokemon, img_URL, actualShownPokemonTypes[index]);
        allContent.innerHTML += pokemonContainer;
    });

    console.log(actualShownPokemon);
    console.log(actualShownPokemonTypes);
    
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

async function renderInfoContent(path, infoId) {
    let infoDataToJson = await loadInfoContent(path);

    getInfoContent(infoDataToJson, infoId);
}

async function getInfoContent(infoDataToJson, infoId) {
    let selector = Number(infoId);

    switch (selector) {
        case 1:
            renderInfoMain(infoDataToJson);
            break;
        case 2:
            renderInfoStats(infoDataToJson);
            break;
        default:
            renderInfoEvoChain(infoDataToJson);
            break;
    }
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
    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentStats(HP, ATK, DEF, specATK, specDEF, Speed);
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

async function loadMore() {
    if (isLoading) return;  // Wenn bereits geladen wird, nichts tun
    isLoading = true;  // Ladevorgang starten

    expandShownPokemon()
    loadIdInArray();
    renderLittleContainer();

    isLoading = false;  // Ladevorgang abgeschlossen
}

async function expandShownPokemon() {
    let allPokemon = await loadData("pokemon?limit=100000&offset=0");
    let actualIndex = actualShownPokemon.length;
    let nextLength = actualIndex + 20;

    for (let i = actualIndex; i < nextLength; i++) {
        actualShownPokemon.push(allPokemon[i]);
        await loadPokemonTypes(allPokemon[i].url);  // Typen für jedes Pokémon laden
    }
}




async function initializeSearch() {
    let searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("input", function () {
        let query = searchBar.value.toLowerCase();

        // Überprüft, ob mindestens 3 Zeichen eingegeben wurden
        if (query.length >= 3) {
            // Filtert die Pokémon, deren Name mit der eingegebenen Zeichenfolge beginnt
            searchedPokemon = actualShownPokemon.filter(pokemon =>
                pokemon.name.toLowerCase().startsWith(query) // Überprüft, ob der Name mit der Zeichenfolge beginnt
            );

            // Lädt die Typen der gefilterten Pokémon basierend auf ihren Positionen in searchedPokemon
            searchedPokemonTypes = searchedPokemon.map((pokemon, index) => {
                // Hier wird angenommen, dass die Positionen der Pokémon und Typen übereinstimmen
                return actualShownPokemonTypes[index];
            });

            console.log(searchedPokemon); // Ausgabe der gefilterten Pokémon zur Überprüfung
            console.log(searchedPokemonTypes); // Ausgabe der gefilterten Pokémon-Typen zur Überprüfung
            // Hier kannst du die nächste Funktion aufrufen, um die gefilterten Pokémon und ihre Typen anzuzeigen
        } else {
            searchedPokemon = []; // Leert das Array, wenn weniger als 3 Zeichen eingegeben werden
            searchedPokemonTypes = []; // Leert auch das Typen-Array
        }
    });
}

// Ruft die Initialisierungsfunktion auf, sobald die Seite geladen ist
document.addEventListener("DOMContentLoaded", initializeSearch);
