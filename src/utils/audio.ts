// Web Audio API Sizzling Sound Synthesizer
let audioCtx: AudioContext | null = null;

export function getSoundEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('sound_enabled');
    if (saved !== null) {
      return saved === 'true';
    }
  }
  return true; // Default to enabled
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sound_enabled', String(enabled));
  }
}

export function playSizzle() {
  if (!getSoundEnabled()) return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    // Create or resume context
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx = new AudioContextClass();
    }
    
    const duration = 0.8; // 0.8 seconds
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise with random crackle impulses
    for (let i = 0; i < bufferSize; i++) {
      const whiteNoise = Math.random() * 2 - 1;
      // Add a tiny crackling envelope modulation
      const mod = Math.sin(i * 0.05) * 0.2 + 0.8;
      
      // Random loud sizzle pops/clicks
      let crackle = 0;
      if (Math.random() > 0.996) {
        crackle = (Math.random() * 2 - 1) * 0.5;
      }
      
      data[i] = (whiteNoise * 0.12 * mod) + crackle;
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    
    // Highpass filter to capture the sizzling high frequencies (grease sizzle)
    const highpass = audioCtx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 5500; // sizzle is high frequency hissing
    highpass.Q.value = 1.2;
    
    // Bandpass filter to sculpt the sizzle
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 7500;
    bandpass.Q.value = 0.7;
    
    // Gain node for smooth envelope
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // Rapid attack
    gainNode.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.04);
    // Smooth decay/sizzle-out
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    // Connect nodes
    source.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    source.start();
    source.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.warn("AudioContext error:", err);
  }
}
