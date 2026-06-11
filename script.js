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

    if (synth.speaking) {
        alert("dear wait 2 minutes phaly wali voice stop huo jye!");
        return;
    }

    alert("Voice Downloading Started... Please wait until speaking finishes.");

    let utterance = new SpeechSynthesisUtterance(text);
    let voiceType = document.getElementById('voiceSelector').value;
    
    // Voice Settings exact match ki hain
    if (voiceType === "men") { utterance.pitch = 0.5; utterance.rate = 0.8; }
    else if (voiceType === "women") { utterance.pitch = 1.2; utterance.rate = 1.0; }
    else if (voiceType === "children") { utterance.pitch = 2.0; utterance.rate = 1.2; }
    else if (voiceType === "robot") { utterance.pitch = 0.1; utterance.rate = 0.7; }

    // Web Audio API setup - browser ki internal voice ko track karne ke liye
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const destination = audioCtx.createMediaStreamDestination();
    
    // MediaRecorder background mein clear sound capture karega bina kisi microphone noise ke
    const mediaRecorder = new MediaRecorder(destination.stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        // Pure audio blob generation jo mobile gallery support karti hai
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'NawabZADA_Voice.mp3';
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Recording start aur TTS trigger
    mediaRecorder.start();
    synth.speak(utterance);

    // Jab bolna khatam ho jaye, to recording auto-stop ho jaye aur download ho jaye
    utterance.onend = () => {
        mediaRecorder.stop();
        audioCtx.close();
    };
};
