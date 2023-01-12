const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `
    }
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    });     
}

loadPokemonItems(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItems(offset, limit)

        loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    } else {
        loadPokemonItems(offset, limit)
    } 
})