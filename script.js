const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const resultDiv = document.querySelector(".result");

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    getWordInfo(input.value);
});

const getWordInfo = async (word)=>{
    try {
        resultDiv.innerHTML = "Fetching Data...please Wait.."
        const data =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const response = await data.json();
        let definitions = response[0].meanings[0].definitions[0];
        let phonetics = response[0].phonetics.find(phonetic => phonetic.audio);

        resultDiv.innerHTML = `
            <h2><strong>Word: </strong>${response[0].word}</h2> 
            <p class="partOfSpeech">${response[0].meanings[0].partOfSpeech}</p> 
            <p><strong>Word: </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p> 
            <p><strong>Example: </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p> 
            <p><strong>Antonyms: </strong></p>
            <ul class="antonyms-list"></ul>
            <p><strong>Synonyms: </strong></p>
            <ul class="synonyms-list"></ul>
            <div class="audio">${phonetics ? `<audio controls><source src="${phonetics.audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : ''}</div>
        `;
        //Fetching Antonyms
        const antonymsList = document.querySelector(".antonyms-list");
        if(definitions.antonyms.length === 0){
            antonymsList.innerHTML += `<span>Not Found</span>`
        }
        else{
            for(let i = 0; i<definitions.antonyms.length; i++){
                antonymsList.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }    

        // Fetching Synonyms
        const synonymsList = document.querySelector(".synonyms-list");
        if(definitions.synonyms.length === 0){
            synonymsList.innerHTML +=`<span>Not Found</span>`
        }
        else{
            for(let j = 0; j<definitions.synonyms.length; j++){
                synonymsList.innerHTML += `<li>${definitions.synonyms[j]}</li>`
            }
        }

        // Adding Read More Button
        resultDiv.innerHTML += `<div><a href="${response[0].sourceUrls}" target="_blank">Read More📑</a></div>`;
        console.log(response);
    }
    catch (error) {
        resultDiv.innerHTML = `<p>sorry, the word could not be found</p>`;
    }
};