const player = {
    hp: 50,
}

const opponent = {
    hp: 50,
}

const deck = {
    spades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    hearts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    clubs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    diamonds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
}

function draw() {
    
}

function drawACard(e) {
    e.preventDefault();

    draw();

    updateDisplay();
}

deck.on("click", drawACard);

