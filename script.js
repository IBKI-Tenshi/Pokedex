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
    for (let i = 0; i < 120; i++) {
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
    console.log(infoContent);

    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentStats(HP, ATK, DEF, specATK, specDEF, Speed);
}

async function renderInfoEvoChain(infoDataToJson) {
    let actualSpeciesURL = infoDataToJson.species.url;
    let EvoChainURL = await fetch(actualSpeciesURL).then(res => res.json());
    let EvoChainData = await fetch(EvoChainURL.evolution_chain.url).then(res => res.json());
    console.log(EvoChainData.chain.evolves_to);

    if (EvoChainData.chain.evolves_to.length === 0) {
        // Keine Entwicklung
        let path = EvoChainURL.id;
        renderInfoContentNoEvo(path);

    } else if (EvoChainData.chain.evolves_to.length > 1) {
        // Mehrere Entwicklungsoptionen auf der ersten Stufe

        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        console.log(baseEvoId);

        actualpokemonFirstEvoOptions = []; // leert das array damit die pokemon sicher nur einmal angezeigt werden

        for (let index = 0; index < EvoChainData.chain.evolves_to.length; index++) {
            // Extrahiere die URL der aktuellen Entwicklungsstufe
            let speciesUrl = EvoChainData.chain.evolves_to[index].species.url;

            // Extrahiere die ID aus der URL
            let speciesId = speciesUrl.split("/")[6];

            // Speichere die ID im globalen Array
            actualpokemonFirstEvoOptions.push(speciesId);
        }

        renderInfoContentMultipleEvosFirstStage(baseEvoId);

        renderfirstStagePokemon();

        console.log("Gesammelte IDs:", actualpokemonFirstEvoOptions);





    } else if (EvoChainData.chain.evolves_to[0].evolves_to.length === 0) {
        // Eine Entwicklung
        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        let firstEvoId = EvoChainData.chain.evolves_to[0].species.url.split("/")[6];

        console.log(EvoChainData.chain);
        console.log(EvoChainData.chain.evolves_to[0]);

        renderInfoContentOneEvo(baseEvoId, firstEvoId);

    } else if (EvoChainData.chain.evolves_to[0].evolves_to.length > 1) {
        // Mehrere Entwicklungsoptionen auf der zweiten Stufe
        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        let firstEvoId = EvoChainData.chain.evolves_to[0].species.url.split("/")[6];


        let secondEvoOptions = EvoChainData.chain.evolves_to[0].evolves_to.map(evo => evo.species.url.split("/")[6]);

        console.log(EvoChainData.chain.evolves_to[0].evolves_to);


        renderInfoContentMultipleEvos(baseEvoId, firstEvoId, secondEvoOptions);

    } else if (EvoChainData.chain.evolves_to[0].evolves_to[0].evolves_to.length === 0) {
        // Zwei Entwicklungen
        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        let firstEvoId = EvoChainData.chain.evolves_to[0].species.url.split("/")[6];
        let secondEvoId = EvoChainData.chain.evolves_to[0].evolves_to[0].species.url.split("/")[6];

        renderInfoContentDuoEvo(baseEvoId, firstEvoId, secondEvoId);
    }
}

async function renderInfoContentNoEvo(path) {
    let infoContent = document.getElementById('info_content');
    let imgPath = img_URL + path + ".png";

    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentNoEvo(imgPath);
}

async function renderInfoContentMultipleEvosFirstStage(baseEvoId) {

    let imgPathBaseEvo = img_URL + baseEvoId + ".png";

    let infoContent = document.getElementById('info_content');
    infoContent.innerHTML = "";
    infoContent.innerHTML = getFirstStageContainer(imgPathBaseEvo);
}

async function renderfirstStagePokemon() {

    let first_evo_optionsRef = document.getElementById('first_evo_options');
    first_evo_optionsRef.innerHTML = "";

    // Iteriere über die Pokémon und füge den HTML-Container hinzu
    actualpokemonFirstEvoOptions.forEach((pokemon, index) => {
        let pokemonImg = getFirstStageContainerPokemon(img_URL, actualpokemonFirstEvoOptions[index])

        first_evo_optionsRef.innerHTML += pokemonImg;
    });
}

async function renderInfoContentOneEvo(baseEvoId, firstEvoId) {

    let imgPathBaseEvo = img_URL + baseEvoId + ".png";
    let pathFirst = firstEvoId;
    let imgPathFirstEvo = img_URL + pathFirst + ".png";
    let infoContent = document.getElementById('info_content');

    infoContent.innerHTML = "";
    infoContent.innerHTML = getInfoContentOneEvo(imgPathBaseEvo, imgPathFirstEvo);
}

async function renderInfoContentDuoEvo(baseEvoId, firstEvoId, secondEvoId) {

    let imgPathBaseEvo = img_URL + baseEvoId + ".png";
    let pathFirst = firstEvoId;
    let imgPathFirstEvo = img_URL + pathFirst + ".png";
    let pathSecond = secondEvoId;
    let imgPathSecondEvo = img_URL + pathSecond + ".png";
    let infoContent = document.getElementById('info_content');

    infoContent.innerHTML = '';
    infoContent.innerHTML = getInfoContentDuoEvo(imgPathBaseEvo, imgPathFirstEvo, imgPathSecondEvo);
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

    let allPokemon = await loadData("pokemon?limit=100000&offset=0");
    let actualIndex = actualShownPokemon.length;
    let nextLength = actualIndex + 20;

    for (let i = actualIndex; i < nextLength; i++) {
        actualShownPokemon.push(allPokemon[i]);
        await loadPokemonTypes(allPokemon[i].url);  // Typen für jedes Pokémon laden
    }

    loadIdInArray();
    renderLittleContainer();

    isLoading = false;  // Ladevorgang abgeschlossen
}

