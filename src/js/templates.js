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
            <a class="info_menu_button">
                <h4>main</h4>
            </a>
            <a class="info_menu_button border_l_r">
                <h4>stats</h4>
            </a>
            <a class="info_menu_button">
                <h4>evo chain</h4>
            </a>
        </div>
        <div class="info_content" id="info_content">
            aaa
            ${getInfoContent(pokemonId - 1)}
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

function getInfoContentMain() {
    return `
        <table class="info_table">
        <tr>
            <td>Height</td>
            <td>A</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>b</td>
        </tr>
        <tr>
            <td>Base Experience</td>
            <td>c</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td>b</td>
        </tr>
    </table>
    `;
}

function getInfoContentStats(path) {
    return`
        <table class="info_table">
        <tr>
            <td>HP</td>
            <td>A</td>
        </tr>
        <tr>
            <td>Attack</td>
            <td>b</td>
        </tr>
        <tr>
            <td>Defense</td>
            <td>c</td>
        </tr>
                <tr>
            <td>Special-Attack</td>
            <td>b</td>
        </tr>
        <tr>
            <td>Special-Defense</td>
            <td>c</td>
        </tr>
        <tr>
            <td>Speed</td>
            <td>d</td>
        </tr>
    </table>
    `;
}

function getInfoContentEvoChain(path) {

}

