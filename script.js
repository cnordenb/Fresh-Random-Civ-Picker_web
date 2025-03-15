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
let remaining = 45;

function getRandomCiv() {
    if (iterator === 45) {
        reset();
    }

    const randomIndex = Math.floor(Math.random() * civs.length);
    let civ = civs.splice(randomIndex, 1)[0];

    document.getElementById('output').innerText = `${civ}`;


    iterator++;
    remaining--;
    UpdateDrawn(civ);
    UpdateRemaining();
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
    remaining = 45;

    document.getElementById('output').innerText = "?";
    document.getElementById('output2').innerText = "(0/45)";
    document.getElementById('output3').innerText = "(45/45)";
    UpdateRemaining();
}

function UpdateDrawn(civ) {
    const historyLog = document.getElementById('historyLog');
    historyLog.value = `${civ} (${iterator + 1}/45)\n${historyLog.value}`;
    document.getElementById('output2').innerText = `(${iterator}/45)`;

}
function UpdateRemaining() {
    const remainingLog = document.getElementById('remainingLog');
    const sortedCivs = [...civs].sort();
    remainingLog.value = sortedCivs.join('\n');
    document.getElementById('output3').innerText = `(${remaining}/45)`;
}