// Everything needs to be called and ran through this function. 
async function getDeck(e) { //used API of a deck of cards here. 
    e.preventDefault();

    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const response = await fetch(url);
    const deck = await response.json();

    let playerHP = 50;
    let dealerHP = 50;

    let deckID = deck.deck_id
    let handValue = 0; 
    let dealerHandValue = 0;

    // if (deckID !== "") {
    //     return;
    // }



    async function hit() { //used for the player to draw a card.

        const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
        const response = await fetch(url);
        const card = await response.json();
        // creates an image tag and puts it into the div for the player. 
        $("<img />").attr("src", card.cards[0].image).appendTo($("#playerDisplay"));
        console.log(card);
        // sets the value of each individual card.
        let cardValue = card.cards[0].value;

        if (cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING") {
            handValue += 10;
        } else if (cardValue === "ACE" && handValue < 11) {
            handValue += 11;
        } else if (cardValue === "ACE" && handValue >= 11) {
            handValue += 1;
        } else {
            handValue += parseInt(cardValue, 10);
        }
        // sets the displayed value of the player's current hand. 
        $("#player-hand-value").html("Player Hand: " + handValue);
        // defines the bust action. 
        if (handValue > 21) {
            handValue = 0;
            playerBust();
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
        } else if (dealerCardValue === "ACE" && dealerHandValue < 11) {
            dealerHandValue += 11;
        } else if (dealerCardValue === "ACE" && dealerHandValue >= 11) {
            dealerHandValue += 1;
        } else {
            dealerHandValue += parseInt(dealerCardValue, 10);
        }

        $("#dealer-hand-value").html("Dealer Hand: " + dealerHandValue);

        if (dealerHandValue > 21) {
            dealerBust();
        }
    }

    async function nextHand() {
        const url = `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`
        const response = await fetch(url);
        const data = await response.json();
        $("#playerDisplay").html("");
        $("#dealerDisplay").html("");
        handValue = 0;
        dealerHandValue = 0;
        $("#dealer-info").html(""); // clears the cards from the player's board
        $("#player-info").html(""); // clears the cards from the dealer's board
        $("#bust").html("")
        $("#hit").show(1);
        $("#stand").show(1);
        hit();
        hit();
        dealerHit();
        dealerHit();
    }

    $("#next-hand").on("click", nextHand);

    hit();
    hit();
    dealerHit();
    dealerHit();

    function stand() {
        $("#hit").hide(1);
        $("#stand").hide(1);

        if (handValue < dealerHandValue) {
            $("#dealer-info").html("The dealer has won this round. You have taken " + (dealerHandValue - handValue) + " damage!");
            playerHP - (dealerHandValue - handValue);
            $("#next-hand").show(1);
        } else if (dealerHandValue < handValue && dealerHandValue < 16) {
            $("#stand").show(1);
            $("#next-hand").hide(100);
            dealerHit();
        } else if (handValue > dealerHandValue) {
            $("#player-info").html("You have won this round. The Dealer takes " + (handValue - dealerHandValue) + " damage!");
            dealerHP - (handValue - dealerHandValue); 
            $("#next-hand").show(1);
        } else {
            $("#dealer-info").html("This round is a tie");
            $("#next-hand").show(1);
        }
    }
    $("#stand").on("click", stand);

    function dealerBust() {
        dealerHandValue = 0;
        $("#hit").hide(1);
        $("#stand").hide(1);
        $("#next-hand").show(1);
        $("#bust").html("The Dealer has BUST!")
        $("#player-info").html("You have won this round. The Dealer takes " + (handValue - dealerHandValue) + " damage!");
        dealerHP - (handValue - dealerHandValue);
    }

    function playerBust() {
        $("#hit").hide(1);
        $("#stand").hide(1);
        $("#next-hand").show(1);
        $("#bust").html("You have BUST!")
        $("#dealer-info").html("The Dealer has won this round. You take " + (dealerHandValue - handValue) + " damage!");
        playerHP - (dealerHandValue - handValue);
    }
    
    // set dealer HP value and text for the display. 
    $("#dealer-hp-value").html("Dealer HP: " + dealerHP);
    // set player HP value and text for the display. 
    $("#player-hp-value").html("Player HP: " + playerHP);

}

$("#deck").on("click", getDeck);