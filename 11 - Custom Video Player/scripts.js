const player = document.querySelector('.player');
const toggle = player.querySelector('.toggle');
const viewer = player.querySelector('.viewer');
const sliders = player.querySelectorAll('.player__slider');
const skip_controls = player.querySelectorAll('[data-skip]');
const progress_bar = player.querySelector('.progress');
const progress_filled = player.querySelector('.progress__filled');
const fullscreen_btn = player.querySelector('.fullscreen');


function togglePlay() {
    const action = viewer.paused ? 'play' : 'pause';
    viewer[action]();
}

function toggleButtonIcon() {
    const icon = viewer.paused ? '▶' : '▋▋';
    toggle.textContent = icon;
}

function changeVideoValue() {
    viewer[this.name] = this.value;
}

function skipPlayback() {
    viewer.currentTime += parseFloat(this.dataset.skip);
}

function scrubPlayback(e) {
    viewer.currentTime = viewer.duration * (e.offsetX / progress_bar.offsetWidth);
}

function updateProgressBar() {
    const percent = viewer.currentTime / viewer.duration * 100
    progress_filled.style.flexBasis = percent + '%';
}

viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', toggleButtonIcon);
viewer.addEventListener('pause', toggleButtonIcon);
viewer.addEventListener('timeupdate', updateProgressBar);

toggle.addEventListener('click', togglePlay);
sliders.forEach(slider => slider.addEventListener('change', changeVideoValue));
sliders.forEach(slider => slider.addEventListener('mousemove', changeVideoValue));
skip_controls.forEach(control => control.addEventListener('click', skipPlayback));

let scrubbing = false;
progress_bar.addEventListener('click', scrubPlayback);
progress_bar.addEventListener('mousedown', () => scrubbing = true);
progress_bar.addEventListener('mouseup', () => scrubbing = false);
progress_bar.addEventListener('mousemove', (e) => scrubbing && scrubPlayback(e))

fullscreen_btn.addEventListener('click', () => {
    if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
        return
    }

    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.webkitRequestFullScreen) {
        player.webkitRequestFullScreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (player.msRequestFullScreen) {
        player.msRequestFullScreen();
    }
})
