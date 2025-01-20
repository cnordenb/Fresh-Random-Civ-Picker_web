document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('drawButton').addEventListener('click', getRandomCiv);
    document.getElementById('resetButton').addEventListener('click', reset);

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            event.preventDefault();
            getRandomCiv();
        } else if (event.code === 'Enter') {
            event.preventDefault();
            reset();
        }
    });

    reset();
});

let civs;
let iterator = 0;

function getRandomCiv() {
    if (iterator === 45) {
        reset();
    }

    const randomIndex = Math.floor(Math.random() * civs.length);
    let civ = civs.splice(randomIndex, 1)[0];

    document.getElementById('output').innerText = `${civ}`;
    document.getElementById('output2').innerText = `(${iterator + 1}/45)`;
    const historyLog = document.getElementById('historyLog');
    historyLog.value = `${civ} (${iterator + 1}/45)\n${historyLog.value}`;
    iterator++;
}

function reset() {
    const historyLog = document.getElementById('historyLog');
    if (civs && civs.length < 45) historyLog.value = `\n${historyLog.value}`;

    civs = [
        "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians", "Burgundians",
        "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians", "Ethiopians", "Franks",
        "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns", "Incas", "Italians", "Japanese",
        "Khmer", "Koreans", "Lithuanians", "Magyars", "Malay", "Malians", "Mayans", "Mongols",
        "Persians", "Poles", "Portuguese", "Romans", "Saracens", "Sicilians", "Slavs", "Spanish",
        "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"
    ];

    iterator = 0;

    document.getElementById('output').innerText = "?";
    document.getElementById('output2').innerText = "(0/45)";
}




test('Completeness test tests that all civs are drawn', () => {
    reset();
    for (let i = 0; i < 45; i++) {
        getRandomCiv();
    }
    
    expect(length(civs).toBe(0);
    
});


