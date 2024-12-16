document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundAudio');
    const volumeControl = document.getElementById('volumeControl');

    // Set the volume control
    if (volumeControl) {
        const savedVolume = localStorage.getItem('musicVolume') || 0.5;
        volumeControl.value = savedVolume;
        audio.volume = savedVolume;

        volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value;
            audio.volume = volume;
            localStorage.setItem('musicVolume', volume);
        });
    }

    // Play the selected music or stop if "No music" is chosen
    playSelectedMusic();

    const settingsButton = document.getElementById('settingsButton');
    if (settingsButton) {
        settingsButton.addEventListener('click', openSettingsPopup);
    }
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

    localStorage.setItem('backgroundMusic', selectedMusic);
    if (volumeControl) {
        localStorage.setItem('musicVolume', volumeControl.value);
    }

    // Apply the selected music and close the popup
    playSelectedMusic();
    closeSettingsPopup();
}

function playSelectedMusic() {
    const audio = document.getElementById('backgroundAudio');
    const selectedMusic = localStorage.getItem('backgroundMusic') || ''; // Default to empty string for "No music"

    const savedVolume = localStorage.getItem('musicVolume') || 0.5;

    if (audio) {
        if (selectedMusic === "") {
            // Stop music if "No music" is selected
            audio.pause();
            audio.src = "";
        } else {
            // Play selected music
            audio.src = selectedMusic;
            audio.volume = savedVolume;
            audio.play().catch((error) => {
                console.warn("Automatic playback was prevented. User interaction may be required to start playback.");
            });
        }
    }
}
