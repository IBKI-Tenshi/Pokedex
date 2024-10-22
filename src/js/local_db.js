let BASE_URL = "https://pokeapi.co/api/v2/";
let img_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
let typeImg_URL = "./assets/icons/Pokemon_Type_Icon_";  // Lokaler Pfad zu deinen Typ-Bildern
let actualShownPokemon = [];
let actualShownPokemonTypes = [];


let isLoading = false;  // Variable, um den Ladezustand zu verfolgen