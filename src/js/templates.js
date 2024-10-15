// Funktion, die den HTML-Container für jedes Pokémon erstellt
function getLittleContainer(pokemon, img_URL, types) {
    let pokemonId = pokemon.url.split("/")[6];  // Pokémon-ID extrahieren
    
    return `
        <div class="pokemon_container_little">
            <div class="id_and_name">
                <p class="pokemon_id">#${pokemonId}</p>
                <p class="pokemon_name">${pokemon.name}</p>
            </div>
            <div class="img_little">
                <img src="${img_URL}${pokemonId}.png" alt="${pokemon.name}">
            </div>
            <div class="actual_pokemon_type">
                ${getTypeImages(types)}  <!-- Ruft die Funktion auf, um Typ-Bilder zu laden -->
            </div>
        </div>
    `;
}