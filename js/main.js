// OOP
class StarWarsCharacter {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }
//display message in the dom
    describe() {
        // console.log(`${this.name} was born in the year ${this.birthYear}.`)
        document.querySelector('h1').innerHTML =
            `${this.name} was born in the year ${this.birthYear}.`;
    }
}
// attaches to options, I used numerical values to match the api data, this made it easier than 
document.querySelector('button').addEventListener('click', () => {
    // console.log('hello button')
    const pplID = document.querySelector('#select').value;
        // if nothing is selected display alert
        if (!pplID) {
            alert('Please select your fav character from Star Wars');
            // adding return so the result doesnt get lost in the ether. 
            return; 
        }
        //Star wars api
        fetch(`https://swapi.dev/api/people/${pplID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const character = new StarWarsCharacter(
                    data.name,
                    data.birth_year
                );
                character.describe();
                //  Giphy api
                //this shit literally broke my brain
                //encodeURI keeps the string together when there are spaces which kept breaking my code/  dont forget to look more into lone surrogat 
                return fetch(`https://api.giphy.com/v1/gifs/search?api_key=B4USSGj3Gs8Qvz6Tj9i9N4NTb1EX5Yt2&q=${encodeURIComponent(data.name)}&limit=1`);
            })
            .then(res => res.json())
            .then(dataTwo => {
                // console.log(dataTwo)
                document.querySelector('iframe').src = dataTwo.data[0].embed_url;
            })
            .catch(err => {
                console.error("Spin that again:", err);
            });
});
