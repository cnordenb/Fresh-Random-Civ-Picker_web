import { useState, useEffect } from 'react'
import frcpLogo from './assets/frcp.png'
import './App.css'


const MAX_CIVS = 45;
let civs: string[];
let iterator: number = 0;
let remaining: number = 45;
let reset_state: boolean = false;
let cleared: boolean = false;

function App()
{
  const [current_civ, setCurrentCiv] = useState("Fresh Random Civ Picker")
  const [civIcon, setCivIcon] = useState(frcpLogo);
  const [civUrl, setCivUrl] = useState("https://github.com/cnordenb/Fresh-Random-Civ-Picker_GUI");

  useEffect(() => {
    reset();
    ClearLog();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent default spacebar action (scrolling)
        getRandomCiv();
      }
      if (event.code === 'Enter') {
        event.preventDefault(); // Prevent default spacebar action (scrolling)
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toLowerCaseFirstChar = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const getRandomCiv = () => {
    if (iterator > 44) reset();

    const randomIndex = Math.floor(Math.random() * civs.length);
    const newCiv = civs.splice(randomIndex, 1)[0];
    setCurrentCiv(newCiv);
    UpdateUrl(newCiv);

    iterator++;
    remaining--;
    UpdateDrawn(newCiv);
    UpdateRemaining();
    UpdateIcon(newCiv);
    reset_state = false;
  }

  const UpdateIcon = async (civ: string) => {
    const civName = toLowerCaseFirstChar(civ);
    try {
      const iconPath = (await import(`./assets/civ_icons/${civName}.png`)).default;
      console.log(`Icon path for ${civName}: ${iconPath}`); // Debugging information
      setCivIcon(iconPath);
    } catch (error) {
      console.error(`Icon for ${civName} not found.`, error);
      setCivIcon(frcpLogo); // Fallback to default logo if icon not found
    }
  }

  const UpdateUrl = (civ: string) => {
    const url = 'https://aoe2techtree.net/#'+civ;
    setCivUrl(url);
  }

  const reset = () => {
    civs = [
      "Armenians", "Aztecs", "Bengalis", "Berbers", "Bohemians", "Britons", "Bulgarians", "Burgundians",
      "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Dravidians", "Ethiopians", "Franks",
      "Georgians", "Goths", "Gurjaras", "Hindustanis", "Huns", "Incas", "Italians", "Japanese",
      "Khmer", "Koreans", "Lithuanians", "Magyars", "Malay", "Malians", "Mayans", "Mongols",
      "Persians", "Poles", "Portuguese", "Romans", "Saracens", "Sicilians", "Slavs", "Spanish",
      "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"
  ];

  iterator = 0;
  remaining = MAX_CIVS;

  const drawnLog = document.getElementById('drawn-log') as HTMLTextAreaElement;
  const drawnLogLabel = document.getElementById('drawn-log-label') as HTMLLabelElement;
  if (!reset_state) drawnLog.value = `\n${drawnLog.value}`;
  drawnLogLabel.innerText = `Drawn: ${iterator}/${MAX_CIVS}`;
  setCurrentCiv("Fresh Random Civ Picker");
  setCivIcon(frcpLogo);
  setCivUrl("https://github.com/cnordenb/Fresh-Random-Civ-Picker_GUI")


  UpdateRemaining();
  if (cleared) ClearLog();
  reset_state = true;
  }


  return (
    <div className="app-container">
      <div className="log-container">
        <div className="log-header">
          <label id='drawn-log-label' className="log-label">Drawn: {iterator}/{MAX_CIVS}</label>
          <button className="clear-button" onClick={ClearLog}>
            Clear
          </button>
          <input type="checkbox" id="drawn-checkbox" className="drawn-checkbox" defaultChecked onChange={(e) => ToggleDrawnLog(e.target.checked)} />
        </div>
        <textarea id="drawn-log" className="drawn-log" placeholder="No civs drawn" readOnly></textarea>
      </div>
      <div className="main-content">
        <div>
          <a href={civUrl} target="_blank">
            <img src={civIcon} className="logo react" alt="civ icon" />
          </a>
        </div>
        <h1>{current_civ}</h1>
        <div className="card">
          <button className="draw-button" onClick={getRandomCiv}>
            Draw Civ
          </button>
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
          <p>
            Click "Draw Civ" or press spacebar to draw a fresh random civ.
            <br/>Click "Reset" or press enter to reset.
          </p>
        </div>
        <p className="read-the-docs">
          Click the civ icon to go to the tech tree for this civ.
        </p>
      </div>
      <div className="log-container">
        <div className="log-header">
          <input type="checkbox" id="remaining-checkbox" className="remaining-checkbox" defaultChecked onChange={(e) => ToggleRemainingLog(e.target.checked)} />
          <label id='remaining-log-label' className="log-label">Remaining: {remaining}/{MAX_CIVS}</label>
        </div>
        <textarea id='remaining-log' className="remaining-log" placeholder="No civs remaining" readOnly></textarea>
      </div>
    </div>
  )
}

function UpdateRemaining()
{
  const remainingLog = document.getElementById('remaining-log') as HTMLTextAreaElement;
  const remainingLogLabel = document.getElementById('remaining-log-label') as HTMLLabelElement;
  const sortedCivs = [...civs].sort();
  remainingLog.value = sortedCivs.join('\n');
  remainingLogLabel.innerText = `Remaining: ${remaining}/${MAX_CIVS}`;

}

function UpdateDrawn(civ: string)
{  
  const drawnLog = document.getElementById('drawn-log') as HTMLTextAreaElement;
  const drawnLogLabel = document.getElementById('drawn-log-label') as HTMLLabelElement;
  if (iterator == 1) drawnLog.value = `\n${drawnLog.value}`;
  drawnLog.value = `${iterator}/${MAX_CIVS} - ${civ}\n${drawnLog.value}`;
  drawnLogLabel.innerText = `Drawn: ${iterator}/${MAX_CIVS}`;
  cleared = false;
}

function ClearLog()
{
  const drawnLog = document.getElementById('drawn-log') as HTMLTextAreaElement;
  if (iterator > 0) drawnLog.value = " ";
  else drawnLog.value = '';
  cleared = true;
}

function ToggleRemainingLog(checked: boolean)
{
  const remainingLog = document.getElementById('remaining-log') as HTMLTextAreaElement;
  const remainingLogLabel = document.getElementById('remaining-log-label') as HTMLLabelElement;
  if (checked) {
    remainingLog.style.display = 'block';
    remainingLogLabel.style.display = 'block';
  } else {
    remainingLog.style.display = 'none';
    remainingLogLabel.style.display = 'none';
  }
}

function ToggleDrawnLog(checked: boolean)
{
  const drawnLog = document.getElementById('drawn-log') as HTMLTextAreaElement;
  const drawnLogLabel = document.getElementById('drawn-log-label') as HTMLLabelElement;
  const drawnClearButton = document.querySelector('.clear-button') as HTMLButtonElement;
  if (checked) {
    drawnLog.style.display = 'block';
    drawnLogLabel.style.display = 'block';
    drawnClearButton.style.display = 'block';
  } else {
    drawnLog.style.display = 'none';
    drawnLogLabel.style.display = 'none';
    drawnClearButton.style.display = 'none';
  }
}

export default App
