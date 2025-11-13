const heartthrobs = [
  { name: "Jonathan Bailey", score: 0 },
  { name: "Chris Hemsworth", score: 0 },
  { name: "Timothee Chalamet", score: 0 },
  { name: "Chris Evans", score: 0 },
  { name: "Henry Cavill", score: 0 },
  { name: "Ryan Gosling", score: 0 },
  { name: "Leonardo Dicaprio (Young)", score: 0 },
  { name: "Andrew Garfield", score: 0 },
  { name: "Jacob Elordi", score: 0 },
  { name: "Robert Pattinson", score: 0 },
  { name: "Tom Holland", score: 0 },
  { name: "Benedict Cumberbatch", score: 0 },
  { name: "Sam Claflin", score: 0 },
];

let totalPairs = 0;
const maxPairs = heartthrobs.length * 5;
let battleCtr = 1;

const battleNo = document.getElementById("battle-ctr");
const left = document.getElementById("left");
const right = document.getElementById("right");
const bothBtn = document.getElementById("both");
const noOpinionBtn = document.getElementById("no-opinion");

function randomizePair(){
    let pair1 = Math.floor(Math.random() * heartthrobs.length);
    let pair2;

    do{
        pair2 = Math.floor(Math.random() * heartthrobs.length);
    } while (pair1 === pair2);

    return [heartthrobs[pair1], heartthrobs[pair2]];
}

function showHeartthrobs(){
    if(totalPairs >= maxPairs)
    {
        showResult();
        return;
    }

    const[leftName, rightName] = randomizePair();
    left.textContent = leftName.name;
    right.textContent = rightName.name;

    battleNo.textContent = `Battle #${battleCtr}`;

    left.onclick = () => choose(leftName);
    right.onclick = () => choose(rightName);
    bothBtn.onclick = () => chooseBoth(leftName, rightName);
    noOpinionBtn.onclick = () => skip();
}

function choose(heartthrob){
    heartthrob.score += 1;
    totalPairs += 1;
    battleCtr += 1;
    
    updatePercentage();
    showHeartthrobs();
}

function chooseBoth(leftName, rightName){
    leftName.score += 1;
    rightName.score += 1;
    totalPairs += 1;
    battleCtr += 1;
    updatePercentage();
    showHeartthrobs();
}

function skip() {
    totalPairs += 1;
    battleCtr += 1;
    updatePercentage();
    showHeartthrobs();
}

function updatePercentage() {
  const percent = Math.floor((totalPairs / maxPairs) * 100);
  document.getElementById("percentage").textContent = `${percent}% Sorted`;
}

function showResult(){
    heartthrobs.sort((a, b) => b.score - a.score);

    let html = "<h2>Final Ranking</h2><ol>";
    heartthrobs.forEach(h => {
        html += `<li>${h.name}</li>`;
    });
    html += "</ol>";
    document.getElementById("result").innerHTML = html;

    left.style.display = "none";
    right.style.display = "none";
    bothBtn.style.display = "none";
    noOpinionBtn.style.display = "none";
    percentage.style.display = "none";
    battleNo.style.display = "none";

    document.getElementById("progress").style.display = "none";
}

showHeartthrobs();