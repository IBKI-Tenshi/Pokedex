let BASE_URL = "https://pokeapi.co/api/v2/";
let img_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let typeImg_URL = "./assets/icons/Pokemon_Type_Icon_";  // Lokaler Pfad zu deinen Typ-Bildern
let actualShownPokemon = [];
let actualShownPokemonTypes = [];
let typeBackground = {
    bug: "rgb(144,193,44)",
    dark: "rgb(90,83,102)",
    dragon: "rgb(9,109,196)",
    electric: "rgb(243,210,59)",
    fairy: "rgb(236,143,230)",
    fighting: "rgb(206,64,105)",
    fire: "rgb(255,156,84)",
    flying: "rgb(146,170,222)",
    ghost: "rgb(82,105,172)",
    grass: "rgb(99,187,91)",
    ground: "rgb(217,119,70)",
    ice: "rgb(116,206,192)",
    normal: "rgb(144,153,161)",
    poison: "rgb(171,106,200)",
    psychic: "rgb(249,113,118)",
    rock: "rgb(199,183,139)",
    steel: "rgb(90,142,161)",
    water: "rgb(77,144,213)",
}