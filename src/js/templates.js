function getLittleContainer(pokemon, img_URL, types) {
    let pokemonId = pokemon.url.split("/")[6];  // Pokémon-ID extrahieren

    let primaryType = types[0]; // Nimm den ersten Typ aus der Liste
    let backgroundColor = typeBackground[primaryType] || "#FFF";

    return `
        <div class="pokemon_container_little" style="background-color: ${backgroundColor};" onclick="toggle_overlay(); renderBigContainer('${backgroundColor}', ${pokemonId}, '${pokemon.name}', ['${types.join("','")}']);">
            <div class="id_and_name">
                <p class="pokemon_id">#${pokemonId}</p>
                <p class="pokemon_name">${pokemon.name}</p>
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
            <p class="pokemon_name_big">${pokemonName}</p>
        </div>
        <div class="img_big">
            <img src="${img_URL}${pokemonId}.png" alt="${pokemonName}">
        </div>
        <div class="actual_pokemon_type_big">
            ${getTypeImages(types)}
        </div>
        <div class="info_menu">
            <div>main</div>
            <div>stats</div>
            <div>evo chain</div>
        </div>
        <div class="info_div">
            infos
        </div>
        <div class="back_next_buttons_div">
            <a class="button" onclick="previousPokemon()">back</a>
            <a class="button" onclick="nextPokemon()">next</a>
        </div>
    </div>
    `;
}