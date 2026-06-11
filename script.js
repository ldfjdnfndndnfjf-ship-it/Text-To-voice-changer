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
        alert("please write your text!");
        return;
    }

    alert("Voice Downloading Started...");

    let voiceType = document.getElementById('voiceSelector').value;
    let lang = "en-US"; // Default standard format

    // Voice type language codes set karna taake voice tone change lage (Bina extra variable k)
    if (voiceType === "men") { lang = "en-IN"; } // Deeper accent variation
    else if (voiceType === "women") { lang = "en-US"; }
    else if (voiceType === "children") { lang = "en-GB"; }
    else if (voiceType === "robot") { lang = "en-AU"; }

    let encText = encodeURIComponent(text);
    // 100% Working Open TTS stream link bina kisi token block ya CORS masle ke
    let audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encText}`;

    // Mobile downloads ke liye direct link generation trick (Is se download corrupt nahi hota)
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'NawabZADA_Voice.mp3';
    // Kuch mobile browsers download attribute direct support nahi karte, unke liye target _blank secure bypass hai
    a.target = '_blank'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
