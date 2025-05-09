const audioPlayer = document.getElementById('audioPlayer');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playBtn = document.querySelector('.player__controls--buttons button:nth-child(2)');
const prevBtn = document.querySelector('.player__controls--buttons button:nth-child(1)');
const nextBtn = document.querySelector('.player__controls--buttons button:nth-child(3)');
const progressSlider = document.querySelector('.player__progress--slider');
const progressTime = document.querySelector('.player__progress--time');
const volumeSlider = document.querySelector('.player__volume--slider');

const songs = [
    {
        title: "Un Coco",
        artist: "Bad Bunny",
        src: "assets/audio/Un-Coco.mp3",
        cover: "assets/img/un-coco.webp"
    },
    {
        title: "Baile Inolvidable",
        artist: "Bad Bunny",
        src: "assets/audio/Baile-Inolvidable.mp3",
        cover: "assets/img/baile-inolvidable.webp"
    },
    {
        title: "Monaco",
        artist: "Bad Bunny",
        src: "assets/audio/Monaco.mp3",
        cover: "assets/img/monaco.jpg"        
    },
    {
        title: "Ahora y Siempre",
        artist: "Quevedo",
        src: "assets/audio/ahora-y-siempre.mp3",
        cover: "assets/img/ahora-y-siempre.avif"        
    },
    {
        title: "La Última",
        artist: "Quevedo",
        src: "assets/audio/la-ultima.mp3",
        cover: "assets/img/la-ultima.avif"        
    },
    {
        title: "Barro",
        artist: "Duki",
        src: "assets/audio/barro.mp3",
        cover: "assets/img/barro.avif"        
    },
    {
        title: "Santo Grial",
        artist: "Duki",
        src: "assets/audio/santo-grial.mp3",
        cover: "assets/img/santo-grial.avif"        
    },
    {
        title: "A 200",
        artist: "Rei",
        src: "assets/audio/a-200.mp3",
        cover: "assets/img/a-200.avif"        
    },
    {
        title: "Un Montón",
        artist: "Rei",
        src: "assets/audio/un-monton.mp3",
        cover: "assets/img/un-monton.avif"        
    },
    {
        title: "Más Allá",
        artist: "Callejeros",
        src: "/assets/audio/mas-alla.mp3",
        cover: "/assets/img/disco-escultura.webp"        
    },
    {
        title: "Jugando",
        artist: "Callejeros",
        src: "/assets/audio/jugando.mp3",
        cover: "/assets/img/sed.webp"        
    },
    {
        title: "Creo",
        artist: "Callejeros",
        src: "/assets/audio/creo.mp3",
        cover: "/assets/img/señales.webp"        
    }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
    trackTitle.textContent = song.title;
    trackArtist.textContent = song.artist;
    audioPlayer.src = song.src;
    progressSlider.value = 0;
    progressTime.textContent = "0:00";
    const coverImage = document.getElementById('cover');
    coverImage.src = song.cover;
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<span class="material-symbols-outlined">pause</span>';
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playBtn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressSlider.value = progress;
        
        const minutes = Math.floor(audioPlayer.currentTime / 60);
        const seconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
        progressTime.textContent = `${minutes}:${seconds}`;
    }
}

function setProgress() {
    if (audioPlayer.duration) {
        const newTime = (progressSlider.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    }
}

function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressSlider.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', setVolume);

loadSong(songs[currentSongIndex]);

audioPlayer.addEventListener('ended', nextSong);

document.querySelectorAll('.main__content--item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[index]);
        playSong();
    });
});