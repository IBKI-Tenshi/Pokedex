function getLittleContainer(pokemon, img_URL, types) {
    let pokemonId = pokemon.url.split("/")[6];  // Pokémon-ID extrahieren

    let primaryType = types[0]; // Nimm den ersten Typ aus der Liste
    let backgroundColor = typeBackground[primaryType] || "#FFF";


    // console.log(pokemon);
    

    return `
        <div class="pokemon_container_little" style="background-color: ${backgroundColor};" onclick="toggle_overlay(); renderBigContainer('${backgroundColor}', ${pokemonId}, '${pokemon.name}', ['${types.join("','")}']);">
            <div class="id_and_name">
                <p class="pokemon_id">#${pokemonId}</p>
                <h3 class="pokemon_name">${pokemon.name}</h3>
            </div>
            <div class="img_little">
                <img src="${img_URL}${pokemonId}.png" alt="${pokemon.name}">
            </div>
            <div class="actual_pokemon_type">
                ${getTypeImages(types)}
            </div>
        </div>
    `;
}

function getBigContainer(backgroundColor, pokemonId, pokemonName, types) {

    let mainInfo = 1;
    let statsInfo = 2;
    // let EvoChain = 3;
    return `
    <div class="pokemon_container_big" style="background-color: ${backgroundColor};" onclick="event.stopPropagation()">
        <div class="id_and_name_big">
            <p class="pokemon_id_big">#${pokemonId}</p>
            <h2 class="pokemon_name_big">${pokemonName}</h2>
        </div>
        <div class="img_big">
            <img src="${img_URL}${pokemonId}.png" alt="${pokemonName}">
        </div>
        <div class="actual_pokemon_type_big">
            ${getTypeImages(types)}
        </div>
        <div class="info_menu">
            <a class="info_menu_button" onclick="renderInfoContent(${pokemonId - 1}, ${mainInfo})">
                <h4>main</h4>
            </a>
            <a class="info_menu_button border_l_r" onclick="renderInfoContent(${pokemonId - 1}, '${statsInfo}')">
                <h4>stats</h4>
            </a>
            <a class="info_menu_button">
                <h4>evo chain</h4>
            </a>
        </div>
        <div class="info_content" id="info_content">
            aaa
            {getInfoContent()}
        </div>
        <div class="back_next_buttons_div">
            <a class="toggle_pokemon_button" onclick="previousPokemon(${pokemonId})">back</a>
            <a class="toggle_pokemon_button" onclick="nextPokemon(${pokemonId})">next</a>
        </div>
    </div>
    `;
}

// Funktion, die die Typ-Bilder basierend auf den Typen anzeigt
function getTypeImages(types) {
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
    return`
        <table class="info_table">
        <tr>
            <td>HP</td>
            <td>${HP}</td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>${ATK}</td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>${DEF}</td>
        </tr>
                <tr>
            <td>Special-Attack</td>
            <td>${specATK}</td>
        </tr>
        <tr>
            <td>Special-Defense</td>
            <td>${specDEF}</td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>${Speed}</td>
        </tr>
    </table>
    `;
}

function getInfoContentEvoChain(path) {

}

