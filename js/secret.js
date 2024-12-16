document.addEventListener('DOMContentLoaded', () => {
    const secret_btn = document.getElementById('secret_link_container');
    if (secret_btn) {
        secret_btn.addEventListener('click', openSecretPopup);
    }

});

function openSecretPopup() {
    const popup = document.getElementById('secret_popup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closeSecretPopup() {
    const popup = document.getElementById('secret_popup');
    if (popup) {
        popup.style.display = 'none';
    }
}
