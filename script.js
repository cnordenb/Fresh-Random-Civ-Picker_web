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

document.getElementById('output').innerText = `? (0/45)`;

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
            break;
        }
        j++;
    }
    const civ = civName(givenIndex);
    document.getElementById('output').innerText = `${civ} (${iterator + 1}/45)`;
    const historyLog = document.getElementById('historyLog');
    historyLog.value = `${civ} (${iterator + 1}/45)\n${historyLog.value}`;
    available[givenIndex] = 0;
    iterator++;
    remaining--;
}

function reset() {
    historyLog.value = `\n${historyLog.value}`;
    iterator = 0;
    available = resetter();
    remaining = 45;
    document.getElementById('output').innerText = "? (0/45)";
}




