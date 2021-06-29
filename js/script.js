//make player object
const player = {
    hp: 50,
}
//make a dealer oject
const dealer = {
    hp: 50,
}
//declair "start" butrton
$("#start-next-restart").html("Start");


async function getDeck(e) { //used API of a deck of cards here. 
    e.preventDefault();

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const response = await fetch(url);
    const deck = await response.json();

    $("#start-next-restart").html("");

    let deckID = deck.deck_id

    async function hit(e) {
        e.preventDefault();

        const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
        const response = await fetch(url);
        const card = await response.json();
        
        console.log(card);
    }

    $("#hit").on("click", hit);

    console.log(deck);
}

 $("#start-next-restart").on("click", getDeck)




// declaire the whole deck in an array
// let deck = [
//     "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
//     "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
//     "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC",
//     "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
// ]
//make a hit, stand, and restart function.
// function hit() {

//     let cardDrawn = Math.floor(Math.random() * deck.length);
//     $("#playerDisplay").text(deck[cardDrawn]);
//     deck.splice(cardDrawn, 1);
    
//     console.log(cardDrawn);
//     console.log(deck[cardDrawn]);
// }
