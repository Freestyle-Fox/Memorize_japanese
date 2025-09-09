let kanaDict = {
  "a": ["あ", "ア"],
  "i": ["い", "イ"],
  "u": ["う", "ウ"],
  "e": ["え", "エ"],
  "o": ["お", "オ"],

  "ka": ["か", "カ"],
  "ki": ["き", "キ"],
  "ku": ["く", "ク"],
  "ke": ["け", "ケ"],
  "ko": ["こ", "コ"],

  "sa": ["さ", "サ"],
  "shi": ["し", "シ"],
  "su": ["す", "ス"],
  "se": ["せ", "セ"],
  "so": ["そ", "ソ"],

  "ta": ["た", "タ"],
  "chi": ["ち", "チ"],
  "tsu": ["つ", "ツ"],
  "te": ["て", "テ"],
  "to": ["と", "ト"],

  "na": ["な", "ナ"],
  "ni": ["に", "ニ"],
  "nu": ["ぬ", "ヌ"],
  "ne": ["ね", "ネ"],
  "no": ["の", "ノ"],

  "ha": ["は", "ハ"],
  "hi": ["ひ", "ヒ"],
  "fu": ["ふ", "フ"],
  "he": ["へ", "ヘ"],
  "ho": ["ほ", "ホ"],

  "ma": ["ま", "マ"],
  "mi": ["み", "ミ"],
  "mu": ["む", "ム"],
  "me": ["め", "メ"],
  "mo": ["も", "モ"],

  "ya": ["や", "ヤ"],
  "yu": ["ゆ", "ユ"],
  "yo": ["よ", "ヨ"],

  "ra": ["ら", "ラ"],
  "ri": ["り", "リ"],
  "ru": ["る", "ル"],
  "re": ["れ", "レ"],
  "ro": ["ろ", "ロ"],

  "wa": ["わ", "ワ"],
  "wo": ["を", "ヲ"],

  "n": ["ん", "ン"],
};

let keys = Object.keys(kanaDict);
shuffle(keys);

let index = -1;
let currentKey = null;
let userName = "";

// Flags to track state
let isQuit = false;

let keyDisplay = document.getElementById("keyDisplay");
let valueDisplay = document.getElementById("valueDisplay");

// Prompt for user name
function getUserName() {
  userName = prompt("Enter your name:", "Vicky") || "Vicky";
}
getUserName();

// Show next romaji key
function nextKey() {
  if (isQuit) return; // disable if quit
  index++;
  if (index >= keys.length) {
    shuffle(keys);
    index = 0;
  }
  currentKey = keys[index];
  keyDisplay.textContent = "Memorize : " + currentKey;
  valueDisplay.textContent = "";
}

// Show Hiragana + Katakana for current key
function showValue() {
  if (isQuit || !currentKey) return; // disable if quit
  let [hiragana, katakana] = kanaDict[currentKey];
  valueDisplay.textContent = "Hiragana: " + hiragana + " , Katakana: " + katakana;
}

// Quit
function quit() {
  if (isQuit) return;
  isQuit = true;
  keyDisplay.textContent = "Goodbye " + userName + " 👋";
  valueDisplay.textContent = "Press Space to restart";
}

// Restart after quit
function restart() {
  isQuit = false;
  shuffle(keys);
  index = -1;
  currentKey = null;
  keyDisplay.textContent = "Press Space to start";
  valueDisplay.textContent = "";
}

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Keyboard controls
function handleKeys(e) {
  if (e.code === "Space") {
    if (isQuit) {
      restart();
    } else {
      nextKey();
    }
  } else if (e.key.toLowerCase() === "s") {
    showValue();
  } else if (e.key.toLowerCase() === "q") {
    quit();
  }
}

document.addEventListener("keydown", handleKeys);

// Button controls
document.getElementById("nextBtn").addEventListener("click", () => { if (!isQuit) nextKey(); });
document.getElementById("showBtn").addEventListener("click", () => { if (!isQuit) showValue(); });
document.getElementById("quitBtn").addEventListener("click", quit);

// Initial message
keyDisplay.textContent = "Press Space to start";
valueDisplay.textContent = "";
