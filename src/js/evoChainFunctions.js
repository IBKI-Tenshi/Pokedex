async function renderInfoEvoChain(infoDataToJson) {
    let actualSpeciesURL = infoDataToJson.species.url;
    let EvoChainURL = await fetch(actualSpeciesURL).then(res => res.json());
    let EvoChainData = await fetch(EvoChainURL.evolution_chain.url).then(res => res.json());

    if (EvoChainData.chain.evolves_to.length === 0) { // Keine Entwicklung
        let path = EvoChainURL.id;
        renderInfoContentNoEvo(path);
    } else if (EvoChainData.chain.evolves_to.length > 1) { // Mehrere Entwicklungsoptionen auf der ersten Stufe
        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        actualpokemonFirstEvoOptions = []; // leert das array damit die pokemon sicher nur einmal angezeigt werden

        for (let index = 0; index < EvoChainData.chain.evolves_to.length; index++) {
            let speciesUrl = EvoChainData.chain.evolves_to[index].species.url; // Extrahiere die URL der aktuellen Entwicklungsstufe
            let speciesId = speciesUrl.split("/")[6]; // Extrahiere die ID aus der URL 
            actualpokemonFirstEvoOptions.push(speciesId); // Speichere die ID im globalen Array
        }
        renderInfoContentMultipleEvosFirstStage(baseEvoId);
        renderfirstStagePokemon();
    } else if (EvoChainData.chain.evolves_to[0].evolves_to.length === 0) { // Eine Entwicklung
        let baseEvoId = EvoChainData.chain.species.url.split("/")[6];
        let firstEvoId = EvoChainData.chain.evolves_to[0].species.url.split("/")[6];
        renderInfoContentOneEvo(baseEvoId, firstEvoId);
    } else if (EvoChainData.chain.evolves_to[0].evolves_to[0].evolves_to.length === 0) { // Zwei Entwicklungen
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

    actualpokemonFirstEvoOptions.forEach((pokemon, index) => { // Iteriere über die Pokémon und füge den HTML-Container hinzu
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