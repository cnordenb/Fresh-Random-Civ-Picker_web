const civs = [
    "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians", "Burgundians",
    "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians", "Ethiopians", "Franks",
    "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns", "Incas", "Italians", "Japanese",
    "Khmer", "Koreans", "Lithuanians", "Magyars", "Malay", "Malians", "Mayans", "Mongols",
    "Persians", "Poles", "Portuguese", "Romans", "Saracens", "Sicilians", "Slavs", "Spanish",
    "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"
];

let available = resetter();
let iterator = 0;
let remaining = 45;
let times_drawn = new Array(45).fill(0);
let isOutOfBounds;


function civName(index) {
    return civs[index] || "(no civ chosen)";
}

function result(max) {
    return Math.floor(Math.random() * max);
}

function resetter() {
    return new Array(45).fill(1);
}

function getRandomCiv() {
    if (iterator === 45) {
        reset();
    }
    let givenIndex = result(remaining);
    let j = 0;
    for (let i = 0; i < 45; i++) {
        while (available[j] !== 1) j++;
        if (i === givenIndex) {
            givenIndex = j;
            times_drawn[givenIndex]++;
            break;
        }
        j++;
    }
    available[givenIndex] = 0;
    if (givenIndex > 44) isOutOfBounds = true;
    iterator++;
    remaining--;
}

function reset() {
    iterator = 0;
    available = resetter();
    remaining = 45;
    for (let i = 0; i < 45; i++) {
        times_drawn[i] = 0;
    }
}


test('Completeness test tests that all civs are drawn', () => {
    reset();
    for (let i = 0; i < 45; i++) {
        getRandomCiv();
    }
    for (let i = 0; i < 45; i++) {
        expect(available[i]).toBe(0);
    }
});



test('Freshness test tests that no civ is drawn more than once', () => {
    reset();
    for (let i = 0; i < 45; i++) {
        getRandomCiv();
    }
    for (let i = 0; i < 45; i++) {
        expect(times_drawn[i]).toBe(1);
    }
});


test('Randomness test tests sufficient randomness', () => {
    let predictable = new Array(45).fill(0);
    let supposed_random = new Array(45).fill(0);
    let check = 0;
    let random_enough;

    for (let i = 0; i < 45; i++) {
        predictable[i]++;
    }

    for (let i = 0; i < 45; i++) {
        supposed_random[i] = result(45);
    }

    
    for (let i = 0; i < 45; i++) {
        if (predictable[i] != supposed_random[i]) {
            check++;
        }
    }
    if (check > 34) random_enough = true;
    else random_enough = false;

    expect(random_enough).toBe(true);

});

test('Extra tests that array bounds are not exceeded', () => {
    reset();
    for (let i = 0; i < 1000; i++) {
        getRandomCiv();
        expect(isOutOfBounds).not.toBe(true);
    }

});