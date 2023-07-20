// URL del API
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Seleccionando los elementos de la pagina a utilizar
const inputField = document.querySelector('#word_input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#results_div');

// Funcion que hace la solicitud al API
const getDefinition = () => {
    const wordQuery = inputField.value;
    const endpoint = `${url}${wordQuery}`;

    fetch(endpoint, { cache: 'no-cache' }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('La solicitud ha fallado.');

    }, networkError => {
        console.log(networkError.message);

    }).then(jsonResponse => {
        renderResponse(jsonResponse);
    })
}

// Funcion que limpia el contenedor antes de agregar nuevo contenido
const showDefinition = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    getDefinition();
};

// Agregando el event handler al boton de Buscar
submit.addEventListener('click', showDefinition);


// Funcion que le da formato a la respuesta para agregarla al HTML
const renderResponse = (res) => {

    let definitionList = [];

    for (let i = 0; i < Math.min(res.length, 5); i++) {
        for (let j = 0; j < Math.min(res[i].meanings.length, 5); j++) {
            for (let k = 0; k < Math.min(res[i].meanings[j].definitions.length, 3); k++) {
                definitionList.push(`<li>(${res[i].meanings[j].partOfSpeech}) ${res[i].meanings[j].definitions[k].definition}</li>`);
            }
        }
    }
    
    definitionList = definitionList.join("");
    responseField.innerHTML = `<p>Definiciones:</p><ol>${definitionList}</ol>`;
    return;
    
}