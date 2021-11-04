const iframe = document.querySelector('.vhi-iframe')
if (iframe) {
    window.open(iframe.src, '_blank').focus();
} else {
    const customStyle = document.createElement('style')

    customStyle.innerHTML = `
                .video-js .vjs-control {
                    display: flex;
                    align-items: center;
                    width: 5em;
                }
                .vjs-button > .vjs-icon-placeholder:before {
                    font-size: 2.3em;
                }
                .vjs-remaining-time .vjs-time-control {
                    display: flex;
                }
                .vjs-duration.vjs-time-control.vjs-control {
                    display: none;
                }
                .video-js .vjs-time-control {
                    font-size: 1.5em;
                    font-weight: bold;
                }
                .vjs-playback-rate .vjs-playback-rate-value {
                    font-size: 1.9em;
                }
                .vjs-current-time.vjs-time-control.vjs-control {
                    width: 5.5em;
                }
                .vjs-mouse-display .vjs-time-tooltip {
                    font-size: 1em !important;
                }
                .vjs-control-bar {
                    height: 4em !important;
                }
                .vjs-seek-button.skip-forward,
                .vjs-seek-button.skip-back {
                    display: none;
                }
                .vjs-play-progress .vjs-time-tooltip {
                    display: none !important; 
                }
            `
    document.getElementsByTagName('head')[0].appendChild(customStyle)

    let isPlayed = false;
    const video = document.querySelector('#vgc-player_html5_api')
    video.addEventListener('play', () => {
        if (!isPlayed) {
            isPlayed = true;

            const progressControl = document.querySelector('.vjs-progress-control.vjs-control')
            const skipBackwardBtn = document.querySelector('.vjs-seek-button.skip-back')
            const skipForwardBtn = document.querySelector('.vjs-seek-button.skip-forward')
            const pause = document.querySelector('.vjs-play-control.vjs-control.vjs-button')
            const toggleFullscreen = document.querySelector('.vjs-fullscreen-control.vjs-control.vjs-button')

            const currentTime = document.createElement('div');
            currentTime.classList.add('vjs-remaining-time')
            currentTime.classList.add('vjs-time-control')
            currentTime.classList.add('vjs-control')

            // controlBar.insertBefore(currentTime, volumePanel)

            // progressControl.addEventListener("mouseenter", function( event ) {
            //     document.querySelector('.vjs-play-progress .vjs-time-tooltip').style.display = "none"
            // }, false);

            const updateTime = () => {
                const videoCurrentTime = Math.round(video.currentTime)
                const hours = videoCurrentTime < 3600 ? null : videoCurrentTime % 3600;
                const minutes = videoCurrentTime < 60 ? "0" : videoCurrentTime % 60;
                const seconds = videoCurrentTime;

                if (hours) {
                    currentTime.innerText = `${hours}:${minutes}:${seconds}`;
                } else {
                    currentTime.innerText = `${minutes}:${seconds}`;
                }
            }

            setInterval(() => {
                updateTime()
            }, 1000)
            document.addEventListener('dblclick', (event) => {
                event.preventDefault()
                toggleFullscreen.click()
            });

            document.addEventListener('keydown', (event) => {
                if (event.code === "ArrowLeft") {
                    skipBackwardBtn.click();
                    updateTime();
                }
                if (event.code === "ArrowRight") {
                    skipForwardBtn.click();
                    updateTime();
                }
                if (event.code === "Space") {
                    pause.click();
                    updateTime();
                }
                if (event.code === "Esc") {
                    toggleFullscreen.click()
                }
            }, false);
        }
    })
}



