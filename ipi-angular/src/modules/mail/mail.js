// Automatski ubaci popup u HTML
document.addEventListener("DOMContentLoaded", () => {
    
    const popupHTML = `
        <div id="mail-popup-bg">
            <div id="mail-popup">
                <h3>Pošalji sadržaj mailom</h3>
                <input type="email" id="email-input" placeholder="Unesite email..." required>
                <br>
                <button id="send-mail">Pošalji</button>
                <button id="cancel-mail">Poništi</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", popupHTML);

    const popupBg = document.getElementById("mail-popup-bg");
    const sendBtn = document.getElementById("send-mail");
    const cancelBtn = document.getElementById("cancel-mail");

    // Klik na Pošalji
    sendBtn.onclick = () => {
        const email = document.getElementById("email-input").value;

        if (!email) {
            alert("Unesite email adresu!");
            return;
        }

        // Hvatamo sadržaj trenutne stranice
        let text = document.body.innerText.replace(/\s+/g, " ");

        const mailto = `mailto:${email}?subject=Sadrzaj%20stranice&body=${encodeURIComponent(text)}`;
        window.location.href = mailto;

        popupBg.style.display = "none";
    };

    // Klik na Poništi
    cancelBtn.onclick = () => {
        popupBg.style.display = "none";
    };
});

// Funkcija poziva popup
function openMailPopup() {
    document.getElementById("mail-popup-bg").style.display = "flex";
}
