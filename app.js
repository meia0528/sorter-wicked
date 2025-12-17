const wickedSongs = [
    {
        title: "No One Mourns the Wicked",
        score: 0
    },
    {
        title: "The Wizard and I",
        score: 0
    },
    {
        title: "What is This Feeling?",
        score: 0
    },
    // {
    //     title: "Something Bad",
    //     score: 0
    // },
    // {
    //     title: "Dancing Through Life",
    //     score: 0
    // },
    // {
    //     title: "Popular",
    //     score: 0
    // },
    // {
    //     title: "I'm Not That Girl",
    //     score: 0
    // },
    // {
    //     title: "One Short Day",
    //     score: 0
    // },
    // {
    //     title: "Defying Gravity",
    //     score: 0
    // },
    // {
    //     title: "Thank Goodness",
    //     score: 0
    // },
    // {
    //     title: "No Place Like Home",
    //     score: 0
    // },
    // {
    //     title: "As Long As You're Mine",
    //     score: 0
    // },
    // {
    //     title: "No Good Deed",
    //     score: 0
    // },
    // {
    //     title: "The Girl in the Bubble",
    //     score: 0
    // },
    // {
    //     title: "For Good",
    //     score: 0
    // }
]

const battleCtr = document.getElementById('battle-ctr');
const percentage = document.getElementById('percentage');
const leftBtn = document.getElementById('left');
const bothBtn = document.getElementById('both');
const noOpinionBtn = document.getElementById('no-opinion');
const rightBtn = document.getElementById('right');
const result = document.getElementById('result');


// pair the songs, shuffle the pair array
// select - +1 to score, change percentage done, battle ctr +1 
// go next
// if done, show results in a table (if same no, then just show same no) 

let battlePairs = [];
for (let i = 0; i < wickedSongs.length; i++)
{
    for (j = i + 1; j < wickedSongs.length; j++)
    {
        battlePairs.push([wickedSongs[i], wickedSongs[j]]);
    }
}

function shuffleSongs(array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const random = Math.floor(Math.random() *  (i + 1));
        [array[i], array[random]] = [array[random], array[i]]
    }
}

shuffleSongs(battlePairs);

let currentIndex = 0;
let ctr = 1;
const maxBattles = battlePairs.length;

function displayBattle()
{
    if (currentIndex >= maxBattles)
    {
        showResults();
        return;
    }

    const [leftSong, rightSong] = battlePairs[currentIndex];
    leftBtn.textContent = leftSong.title;
    rightBtn.textContent = rightSong.title;
    battleCtr.textContent = `Battle ${ctr}`;
    percentage.textContent = `${Math.round((currentIndex / maxBattles) * 100)}%`;

    leftBtn.onclick = () => {
        choose(leftSong);
        displayBattle();
    }

    rightBtn.onclick = () => {
        choose(rightSong);
        displayBattle();
    }

    bothBtn.onclick = () => {
        chooseBoth(leftSong, rightSong);
        displayBattle();
    }

    noOpinionBtn.onclick = () => {
        skip();
        displayBattle();
    }
}

function choose(song)
{
    song.score += 1;
    currentIndex += 1;
    ctr += 1;
}

function chooseBoth(leftSong, rightSong)
{
    leftSong.score += 1;
    rightSong.score += 1;
    currentIndex += 1;
    ctr += 1;
}

function skip()
{
    currentIndex += 1;
    ctr += 1;
}

function showResults()
{
    const sorted = [...wickedSongs].sort((a, b) => b.score - a.score);
    
    let resultHTML = '<table><tr><th>Rank</th><th>Song</th></tr>';
    sorted.forEach((song, index) => {
        resultHTML += `<tr> <th>${index + 1}</th> <th>${song.title}</th> </tr>`;
    }); 
    resultHTML += '</table>';

    result.innerHTML = resultHTML;

    // hide all other elements
    battleCtr.style.display = 'none'; 
    percentage.style.display = 'none'; 
    leftBtn.style.display = 'none'; 
    rightBtn.style.display = 'none'; 
    noOpinionBtn.style.display = 'none'; 
    bothBtn.style.display = 'none'; 
}

displayBattle();