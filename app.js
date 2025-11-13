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


let battleCtr = 1;
const battleNo = document.getElementById("battle-ctr");
const left = document.getElementById("left");
const right = document.getElementById("right");
const bothBtn = document.getElementById("both");
const noOpinionBtn = document.getElementById("no-opinion");

let allPairs = [];
for (let i = 0; i < heartthrobs.length; i++) 
{
    for (let j = i + 1; j < heartthrobs.length; j++) 
    {
        allPairs.push([heartthrobs[i], heartthrobs[j]]);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(allPairs);

let currentIndex = 0;
const maxPairs = allPairs.length;

function updatePercentage() {
    const percent = Math.floor((currentIndex / maxPairs) * 100);
    document.getElementById("percentage").textContent = `${percent}% Sorted`;
}

function showHeartthrobs(){
    if(currentIndex >= maxPairs)
    {
        showResult();
        return;
    }

    const[leftName, rightName] = allPairs[currentIndex];
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
    currentIndex += 1;
    battleCtr += 1;
    
    updatePercentage();
    showHeartthrobs();
}

function chooseBoth(leftName, rightName){
    leftName.score += 1;
    rightName.score += 1;
    currentIndex += 1;
    battleCtr += 1;
    updatePercentage();
    showHeartthrobs();
}

function skip() {
    currentIndex += 1;
    battleCtr += 1;
    updatePercentage();
    showHeartthrobs();
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
