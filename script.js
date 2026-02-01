// --- 1. Music Player Logic ---
const audio = document.getElementById('birthday-song');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸️ Pause";
    } else {
        audio.pause();
        playBtn.innerText = "▶️ Play";
    }
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
});

const board = document.getElementById('puzzle-board');
let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 

function createPuzzle() {
    board.innerHTML = '';
    tiles.forEach((tile, index) => {
        const div = document.createElement('div');
        div.classList.add('puzzle-piece');
        
        if (tile !== 8) {
            // Updated to use your new selfie
            div.style.backgroundImage = `url('WhatsApp Image 2026-01-31 at 12.27.32 PM1.jpeg')`;
            const row = Math.floor(tile / 3);
            const col = tile % 3;
            div.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        } else {
            div.style.background = "#fff"; 
        }
        
        div.onclick = () => moveTile(index);
        board.appendChild(div);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(8);
    const moves = [index-1, index+1, index-3, index+3];
    if (moves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        createPuzzle();
        checkWin();
    }
}

function shufflePuzzle() {
    tiles.sort(() => Math.random() - 0.5);
    createPuzzle();
}

function checkWin() {
    if (tiles.every((v, i) => v === i)) {
        alert("Happy Birthday Booboo! You solved it! ❤️");
        launchConfetti();
    }
}

function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#ffffff']
    });
}

createPuzzle();