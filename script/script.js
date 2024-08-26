let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.querySelector('.song-img'); 


song.onloadeddata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};


let isRotating = false;
let rotationAngle = 0;
let rotationInterval;

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add('fa-pause');
        ctrlIcon.classList.remove('fa-play');
        startRotation();
    } else {
        song.pause();
        ctrlIcon.classList.add('fa-play');
        ctrlIcon.classList.remove('fa-pause');
        stopRotation();
    }
}

function startRotation() {
    if (!isRotating) {
        isRotating = true;
        rotationInterval = setInterval(() => {
            rotationAngle += 0.5; // Slower rotation speed (adjust as needed)
            songImg.style.transform = `rotate(${rotationAngle}deg)`;
        }, 12); // Adjust the interval time for smoothness (increased for slower rotation)
    }
}

function stopRotation() {
    if (isRotating) {
        isRotating = false;
        clearInterval(rotationInterval);
    }
}


setInterval(() => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);


progress.oninput = function() {
    song.currentTime = progress.value;
    song.play(); 
    ctrlIcon.classList.add('fa-pause');
    ctrlIcon.classList.remove('fa-play');
    startRotation();
};

song.addEventListener('timeupdate', () => {
    progress.value = song.currentTime;
});
