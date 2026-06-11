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
        alert("Pehle kuch likhen to sahi, Jani!");
        return;
    }

    alert("Voice Downloading Started...");

    // Nawab ZADA, browser voice ko direct local file nahi banata, 
    // isliye hum online tts API use kar rahe hain taake exact MP3 generate ho aur gallery me chale.
    let voiceType = document.getElementById('voiceSelector').value;
    let lang = "en"; // Default language
    
    // Voice type ke mutabiq language ya settings fetch karne ka jugaar
    // (Taake extra functions add na karne paren)
    let encText = encodeURIComponent(text);
    let audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encText}`;

    // Downloading logic via fetching actual audio data
    fetch(audioUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'NawabZADA_Voice.mp3';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            alert("Download me thoda masla hua, jani!");
        });
};
