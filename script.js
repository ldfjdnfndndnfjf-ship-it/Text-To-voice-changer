// Unlock Logic
document.getElementById('followBtn').addEventListener('click', function() {
    // Thori dair baad tool unlock ho jaye ga jab user link pe click krey ga
    setTimeout(() => {
        document.getElementById('lockerOverlay').style.display = 'none';
        document.getElementById('mainTool').style.display = 'block';
    }, 2000); 
});

// Voice Logic
let synth = window.speechSynthesis;

function speakText() {
    if (synth.speaking) return;
    let text = document.getElementById('textInput').value;
    let voiceType = document.getElementById('voiceSelector').value;
    
    if (text !== "") {
        let utterance = new SpeechSynthesisUtterance(text);
        
        if (voiceType === "men") { utterance.pitch = 0.5; utterance.rate = 0.8; }
        else if (voiceType === "women") { utterance.pitch = 1.2; utterance.rate = 1.0; }
        else if (voiceType === "children") { utterance.pitch = 2.0; utterance.rate = 1.2; }
        else if (voiceType === "robot") { utterance.pitch = 0.1; utterance.rate = 0.7; }

        synth.speak(utterance);
    }
}

document.getElementById('downloadBtn').onclick = function() {
    alert("Voice generation complete! Please use a screen recorder or browser extension to save as MP3 on mobile.");
};
