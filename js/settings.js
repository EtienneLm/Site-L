document.addEventListener('DOMContentLoaded', () => {
    // Attach the openSettingsPopup function to the settings button
    const settingsButton = document.getElementById('settingsButton');
    if (settingsButton) {
        settingsButton.addEventListener('click', openSettingsPopup);
    }

    // Set volume slider to saved value or default
    const volumeControl = document.getElementById('volumeControl');
    if (volumeControl) {
        const savedVolume = localStorage.getItem('musicVolume') || 0.5;
        volumeControl.value = savedVolume;
        
        // Listen for volume slider changes and update audio volume
        volumeControl.addEventListener('input', (e) => {
            const audio = document.getElementById('backgroundAudio');
            const volume = e.target.value;
            if (audio) audio.volume = volume;
        });
    }

    playSelectedMusic();
});

function openSettingsPopup() {
    const popup = document.getElementById('settingsPopup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closeSettingsPopup() {
    const popup = document.getElementById('settingsPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function saveSettings() {
    const selectedMusic = document.querySelector('input[name="music"]:checked').value;
    const volumeControl = document.getElementById('volumeControl');

    // Save music selection and volume to local storage
    localStorage.setItem('backgroundMusic', selectedMusic);
    if (volumeControl) {
        localStorage.setItem('musicVolume', volumeControl.value);
    }

    playSelectedMusic();
    closeSettingsPopup();
}

function playSelectedMusic() {
    const audio = document.getElementById('backgroundAudio');
    const selectedMusic = localStorage.getItem('backgroundMusic');
    const savedVolume = localStorage.getItem('musicVolume') || 0.5;

    if (audio) {
        if (selectedMusic === "") {
            // If "No music" is selected, stop and clear the audio
            audio.pause();
            audio.src = "";
        } else {
            // Otherwise, set the selected music and volume
            audio.src = selectedMusic;
            audio.volume = savedVolume;
            audio.play();
        }
    }
}
