//make player object
const player = {
    hp: 50,
}
//make a dealer oject
const dealer = {
    hp: 50,
}

async function getDeck(e) { //used API of a deck of cards here. 
    e.preventDefault();

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const response = await fetch(url);
    const deck = await response.json();

    let deckID = deck.deck_id
    let handValue = 0; 
    let dealerHandValue = 0;
    
    async function hit() { //used for the player to draw a card.

        const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
        const response = await fetch(url);
        const card = await response.json();
        
        $("<img />").attr("src", card.cards[0].image).appendTo($("#playerDisplay"));
        console.log(card);

        let cardValue = card.cards[0].value;

        if (cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING") {
            handValue += 10;
        } else if (cardValue === "ACE" && handValue < 11) {
            handValue += 11;
        } else if (cardValue === "ACE" && handValue > 11) {
            handValue += 1;
        } else {
            handValue += parseInt(cardValue, 10);
        }
        console.log(handValue);
        
        if (handValue > 21) {
            $("#player-bust").html("BUST!");
            handValue = 0;
            stand();
        }
    }

    $("#hit").on("click", hit);

    async function dealerHit() { //used for the dealer to draw a card.

        const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
        const response = await fetch(url);
        const dealerCard = await response.json();
        
        $("<img />").attr("src", dealerCard.cards[0].image).appendTo($("#dealerDisplay"));

        let dealerCardValue = dealerCard.cards[0].value;

        if (dealerCardValue === "JACK" || dealerCardValue === "QUEEN" || dealerCardValue === "KING") {
            dealerHandValue += 10;
        } else if (dealerCardValue === "ACE" && handValue < 11) {
            dealerHandValue += 11;
        } else if (dealerCardValue === "ACE" && handValue > 11) {
            dealerHandValue += 1;
        } else {
            dealerHandValue += parseInt(dealerCardValue, 10);
        }
        console.log(dealerHandValue)

        if (dealerHandValue > 21) {
            $("#dealer-bust").html("BUST!");
            dealerHandValue = 0;
            stand();
        }
    }

    $("#stand").on("click", stand);

    async function nextHand() {
        const url = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`
        const response = await fetch(url);
        const data = await response.json();
        $("#playerDisplay").html("");
        $("#dealerDisplay").html("");
        handValue = 0;
        dealerHandValue = 0;
        hit();
        hit();
        dealerHit();
        dealerHit();
        console.log(data);
    }

    $("#next-hand").on("click", nextHand);

    hit();
    hit();
    dealerHit();
    dealerHit();

    function stand() {
        if (handValue < dealerHandValue) {
            player.hp - (dealerHandValue - handValue);
        } else if (dealerHandValue < handValue && dealerHandValue < 16) {
            dealerHit();
        } else {
            dealer.hp - (handValue - dealerHandValue); 
        }
    }

    $("#stand").on("click", stand);

    console.log(deck);
}

$("#deck").on("click", getDeck);