function getLittleContainer(pokemon, img_URL, types) {
    let capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return `
        <div class="pokemon_container_little" onclick="toggle_overlay(); renderBigContainer(${pokemon.Id}, '${capitalizedName}', ['${types.join("','")}']);">
            <div class="id_and_name">
                <h3 class="pokemon_id">#${pokemon.Id}</h3>
                <h3 class="pokemon_name">${capitalizedName}</h3>
            </div>
            <div class="img_little bg_${types[0]}">
                <img src="${img_URL}${pokemon.Id}.png" alt="${pokemon.name}">
            </div>
            <div class="actual_pokemon_type">
                ${getTypeImages(types)}
            </div>
        </div>
    `;
}

function getBigContainer(pokemonId, capitalizedName, types) {
    let mainInfo = 1;
    let statsInfo = 2;
    let EvoChain = 3;

    return `
    <a class="arrow" onclick="event.stopPropagation(); previousPokemon(${pokemonId})">
        <img src="./assets/icons/arrow-left.png">
    </a>
    <div class="pokemon_container_big" onclick="event.stopPropagation()">
        <div class="id_and_name_big">
            <h2 class="pokemon_id_big">#${pokemonId}</h2>
            <h2 class="pokemon_name_big">${capitalizedName}</h2>
        </div>
        <div class="img_big bg_${types[0]}">
            <img src="${img_URL}${pokemonId}.png" alt="${capitalizedName}">
        </div>
        <div class="actual_pokemon_type_big">
            ${getTypeImages(types)}
        </div>
        <div class="info_menu">
            <a class="info_menu_button" onclick="renderInfoContent(${pokemonId - 1}, ${mainInfo})">
                <h4>Main</h4>
            </a>
            <a class="info_menu_button border_l_r" onclick="renderInfoContent(${pokemonId - 1}, '${statsInfo}')">
                <h4>Stats</h4>
            </a>
            <a class="info_menu_button"  onclick="renderInfoContent(${pokemonId - 1}, '${EvoChain}')">
                <h4>Evo chain</h4>
            </a>
        </div>
        <div class="info_content" id="info_content">
            aaa
            {getInfoContent()}
        </div>
    </div>
    <a class="arrow" onclick="event.stopPropagation(); nextPokemon(${pokemonId})">
        <img src="./assets/icons/arrow-right.png">
    </a>
    `;
}

function getTypeImages(types) { // Funktion, die die Typ-Bilder basierend auf den Typen anzeigt
    return types.map(type => `<img src="${typeImg_URL}${type}.png" alt="${type}">`).join(" ");
}

function getInfoContentMain(height, weight, baseExperience, abilities) {
    return `
        <table class="info_table">
        <tr>
            <td>Height</td>
            <td>${height}</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${weight}</td>
        </tr>
        <tr>
            <td>Base Experience</td>
            <td>${baseExperience}</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td>${abilities}</td>
        </tr>
    </table>
    `;
}

function getInfoContentStats(HP, ATK, DEF, specATK, specDEF, Speed) {
    return `
    <div class="stats_container">
        <div class="stat">
            <p>HP</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${HP}%;"><span>${HP}</span></div>
            </div>
        </div>
        <div class="stat">
            <p>Attack</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${ATK}%;"><span>${ATK}</span></div>
            </div>
        </div>
        <div class="stat">
            <p>Defense</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${DEF}%;"><span>${DEF}</span></div>
            </div>
        </div>
        <div class="stat">
            <p>Special Attack</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${specATK}%;"><span>${specATK}</span></div>
            </div>
        </div>
        <div class="stat">
            <p>Special Defense</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${specDEF}%;"><span>${specDEF}</span></div>
            </div>
        </div>
        <div class="stat">
            <p>Speed</p>
            <div class="progress-bar">
                <div class="filler" style="width: ${Speed}%;"><span>${Speed}</span></div>
            </div>
        </div>
    </div>
    `;
}

function getInfoContentNoEvo(imgPath) {
    return `
    <div class="evoChainImgDiv">
        <img src="${imgPath}" alt="">
    </div>
    `;
}

function getFirstStageContainer(imgPathBaseEvo) {
    return `
        <div id="all_evo_div">
            <div id="base_evo_div">
                <img src="${imgPathBaseEvo}" alt="">
            </div>
            <div id="first_evo_options">
            </div>
        </div>
    `;
}

function getFirstStageContainerPokemon(img_URL, path) {
    return `
        <div>
            <img src="${img_URL + path + ".png"}" alt="">
        </div>
    `;
}

function getInfoContentOneEvo(imgPathBaseEvo, imgPathFirstEvo) {
    return `
        <div class="evoChainImgDiv">
            <img src="${imgPathBaseEvo}" alt="">
            <div>>></div>
            <img src="${imgPathFirstEvo}" alt="">
        </div>
    `;
}

function getInfoContentDuoEvo(imgPathBaseEvo, imgPathFirstEvo, imgPathSecondEvo) {
    return `  
        <div class="evoChainImgDiv">
            <img src="${imgPathBaseEvo}" alt="">
            <div>>></div>
            <img src="${imgPathFirstEvo}" alt="">
            <div>>></div>
            <img src="${imgPathSecondEvo}" alt="">
        </div>
    `;
}

