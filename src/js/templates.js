function getLittleContainer(pokemon, img_URL) {
    // Extrahiere die ID aus der URL
    let pokemonId = pokemon.url.split("/")[6];
    
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
                actual type
            </div>
        </div>
    `;
}
