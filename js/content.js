const keyboardListener = (back, forward, pause, exitFullscreen) => {
    document.addEventListener('keydown', (event) => {
        if (event.code === "ArrowLeft") {
            back.click()
        }
        if (event.code === "ArrowRight") {
            forward.click()
        }
        if (event.code === "Space") {
            pause.click()
        }
        if (event.code === "Esc") {
            exitFullscreen.click()
        }
    }, false);
}

const iframe = document.querySelector('.vhi-iframe')
if (iframe) {
    window.open(iframe.src, '_blank').focus();
} else {
    let isPlayed = false;
    const video = document.querySelector('#vgc-player_html5_api')
    video.addEventListener('play', () => {
        if (!isPlayed) {
            isPlayed = true;

            const skipBackwardBtn = document.querySelector('.vjs-seek-button.skip-back')
            const skipForwardBtn = document.querySelector('.vjs-seek-button.skip-forward')
            const pause = document.querySelector('.vjs-play-control.vjs-control.vjs-button')
            const toggleFullscreen = document.querySelector('.vjs-fullscreen-control.vjs-control.vjs-button')

            document.addEventListener('dblclick', (event) => {
                event.preventDefault()
                toggleFullscreen.click()
            });
            keyboardListener(skipBackwardBtn, skipForwardBtn, pause, toggleFullscreen)
        }
    })
}



