let audio = document.getElementById('audioPlayer');
let volumeControl = document.getElementById('volumeControl');
let lastListened = localStorage.getItem('lastListened') ? JSON.parse(localStorage.getItem('lastListened')) : null;
let history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
let currentPlayingButton = null;

function playAudio(src, button) {
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }
    button.classList.add('playing');
    currentPlayingButton = button;

    audio.src = src;
    audio.currentTime = localStorage.getItem(src) ? parseFloat(localStorage.getItem(src)) : 0;
    audio.play();

    audio.ontimeupdate = () => {
        localStorage.setItem(src, audio.currentTime);
    };

    localStorage.setItem('lastListened', JSON.stringify(src));
    if (!history.includes(src)) {
        history.push(src);
        if (history.length > 3) {
            history.shift();
        }
        localStorage.setItem('history', JSON.stringify(history));
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

window.onload = function() {
    if (lastListened) {
        document.getElementById('lastListened').textContent = lastListened;
        let historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        history.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
        document.getElementById('popup').style.display = 'block';
    }
};

volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
});