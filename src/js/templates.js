function getLittleContainer(pokemon) {
    // Extrahiere die ID aus der URL
    let pokemonId = pokemon.url.split("/")[6];
    
    // Erstelle den HTML-Code als Template-String
    return `
        <div class="pokemon_container_little">
            <div class="id_and_name">
                <p class="pokemon_id">${pokemonId}</p>
                <p class="pokemon_name">${pokemon.name}</p>
            </div>
            <div class="img_little">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}">
            </div>
            <div class="actual_pokemon_type">
                actual type
            </div>
        </div>
    `;
}
