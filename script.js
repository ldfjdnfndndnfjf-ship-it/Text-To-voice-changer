let synth = window.speechSynthesis;
let recognition;

// Unlock Logic
document.getElementById('followBtn').addEventListener('click', function() {
    setTimeout(() => {
        document.getElementById('lockerOverlay').style.display = 'none';
        document.getElementById('mainTool').style.display = 'block';
    }, 2000); 
});

function speakText() {
    if (synth.speaking) return;
    let text = document.getElementById('textInput').value;
    let voiceType = document.getElementById('voiceSelector').value;
    
    if (text !== "") {
        let utterance = new SpeechSynthesisUtterance(text);
        
        // Voice Customization
        if (voiceType === "men") { utterance.pitch = 0.5; utterance.rate = 0.8; }
        else if (voiceType === "women") { utterance.pitch = 1.2; utterance.rate = 1.0; }
        else if (voiceType === "children") { utterance.pitch = 2.0; utterance.rate = 1.2; }
        else if (voiceType === "robot") { utterance.pitch = 0.1; utterance.rate = 0.7; }

        synth.speak(utterance);
    }
}

// --- ACTUAL DOWNLOAD LOGIC START ---
document.getElementById('downloadBtn').onclick = function() {
    let text = document.getElementById('textInput').value;
    if (!text) {
        alert("Please write your text!");
        return;
    }

    alert("Voice Downloading Started...");

    let voiceType = document.getElementById('voiceSelector').value;
    let voiceParam = "UK English Female"; // Default voice

    // Voice type ke mutabiq voice select karna (Bina extra function ke)
    if (voiceType === "men") { voiceParam = "UK English Male"; }
    else if (voiceType === "women") { voiceParam = "UK English Female"; }
    else if (voiceType === "children") { voiceParam = "US English Female"; }
    else if (voiceType === "robot") { voiceParam = "UK English Male"; }

    let encText = encodeURIComponent(text);
    // CORS-free direct audio link jo browser block nahi karega
    let audioUrl = `https://code.responsivevoice.org/develop/getvoice.php?t=${encText}&tl=${encodeURIComponent(voiceParam)}&sv=&vn=&pitch=0.5&rate=0.5&vol=1&key=39b3G59t`;

    // Direct hidden link download trick (CORS error bypass karne ke liye best hai)
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = audioUrl;
    a.download = 'NawabZADA_Voice.mp3';
    a.target = '_blank'; // Mobile aur desktop dono par secure download trigger karega
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
