/**
 * Sound effects utility for birthday celebration
 */

let audioContext: AudioContext | null = null;

/**
 * Get or create audio context
 */
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play a realistic firecracker bursting sound effect
 */
export const playFirecrackerSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Play a single pop sound (softer and smoother)
    createFirecrackerPop(ctx, now);
  } catch (error) {
    console.error("Could not play firecracker sound:", error);
  }
};

/**
 * Create a realistic firecracker pop sound (sharp crack)
 */
function createFirecrackerPop(ctx: AudioContext, startTime: number) {
  // Create an impulse burst (very short, sharp sound)
  const bufferSize = Math.floor(ctx.sampleRate * 1.2);
  const impulseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const impulseData = impulseBuffer.getChannelData(0);
  
  // Create sharp impulse that mimics a firecracker crack
  for (let i = 0; i < bufferSize; i++) {
    const progress = i / bufferSize;
    
    // Sharp initial spike followed by decay
    if (i < bufferSize * 0.03) {
      // First 3% - very loud initial spike
      impulseData[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - (i / (bufferSize * 0.03)) * 0.3);
    } else if (i < bufferSize * 0.15) {
      // Next 12% - crackling tail with random intensities
      const randomCrackle = Math.random();
      const crackleFactor = randomCrackle > 0.3 ? 1 : 0;
      impulseData[i] = (Math.random() * 2 - 1) * crackleFactor * Math.pow(1 - progress, 1.5) * 0.6;
    } else {
      // Rest - quick fade out
      impulseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - progress, 2) * 0.2;
    }
  }
  
  // Play the impulse
  const impulseSource = ctx.createBufferSource();
  impulseSource.buffer = impulseBuffer;
  
  const impulseGain = ctx.createGain();
  impulseSource.connect(impulseGain);
  impulseGain.connect(ctx.destination);
  
  // Sharp envelope with very slow decay
  impulseGain.gain.setValueAtTime(0.2, startTime);
  impulseGain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);
  
  impulseSource.start(startTime);
  impulseSource.stop(startTime + 1.2);
}

/**
 * Create a rocket launch whistle sound
 */
function createRocketSound(ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "sine";
  
  // Ascending pitch like a rocket launching
  osc.frequency.setValueAtTime(200, startTime);
  osc.frequency.linearRampToValueAtTime(800, startTime + 0.6);
  osc.frequency.exponentialRampToValueAtTime(100, startTime + 0.8);
  
  // Envelope: quick attack, sustain, then quick decay
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.12, startTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
  
  osc.start(startTime);
  osc.stop(startTime + 0.8);
}

/**
 * Create a sizzle/crackle sound
 */
function createSizzleSound(ctx: AudioContext, startTime: number) {
  const bufferSize = Math.floor(ctx.sampleRate * 0.6);
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  
  // Generate crackling noise that fades
  for (let i = 0; i < bufferSize; i++) {
    const progress = i / bufferSize;
    const randomNoise = Math.random() * 2 - 1;
    // Create crackling by filtering random values
    noiseData[i] = (Math.random() > 0.5 ? randomNoise : 0) * Math.pow(1 - progress, 1.2);
  }
  
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  
  const noiseGain = ctx.createGain();
  noiseSource.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  
  // Soft sizzle envelope
  noiseGain.gain.setValueAtTime(0.1, startTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.6);
  
  noiseSource.start(startTime);
  noiseSource.stop(startTime + 0.6);
}

/**
 * Create a burst/explosion sound
 */
function createBurstSound(ctx: AudioContext, startTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "square";
  
  // Short burst that drops in pitch quickly
  osc.frequency.setValueAtTime(600, startTime);
  osc.frequency.exponentialRampToValueAtTime(200, startTime + 0.15);
  
  // Quick attack and decay
  gain.gain.setValueAtTime(0.15, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
  
  osc.start(startTime);
  osc.stop(startTime + 0.15);
}

/**
 * Play synchronized firecracker bursts matching the animation
 * Fires 8 times with varied sounds to match the 8 firework bursts in the animation
 */
export const playFirecrackersWithAnimation = () => {
  try {
    const ctx = getAudioContext();
    const soundSequence = [
      createFirecrackerPop,
      createBurstSound,
      createSizzleSound,
      createFirecrackerPop,
      createBurstSound,
      createSizzleSound,
      createFirecrackerPop,
      createBurstSound
    ];
    
    // Play varied sounds to match the 8 firework bursts in the animation
    for (let i = 0; i < 8; i++) {
      const delay = i * 0.25;
      setTimeout(() => {
        soundSequence[i](ctx, ctx.currentTime);
      }, delay * 1000);
    }
  } catch (error) {
    console.error("Could not play firecracker sequence:", error);
  }
};

/**
 * Play Happy Birthday song with the person's name
 * Returns a promise that resolves when the song finishes
 */
export const playBirthdaySong = (name: string = "Tanya"): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      const startTime = ctx.currentTime;
      
      // Happy Birthday melody notes (in semitones relative to C4)
      // C, C, D, C, F, E (Happy Birthday to you)
      const melody = [
        { freq: 262, duration: 0.5 },    // C
        { freq: 262, duration: 0.5 },    // C
        { freq: 294, duration: 0.5 },    // D
        { freq: 262, duration: 0.5 },    // C
        { freq: 349, duration: 0.5 },    // F
        { freq: 330, duration: 0.75 },   // E
        { freq: 262, duration: 0.5 },    // C
        { freq: 262, duration: 0.5 },    // C
        { freq: 294, duration: 0.5 },    // D
        { freq: 262, duration: 0.5 },    // C
        { freq: 392, duration: 0.5 },    // G
        { freq: 349, duration: 1.5 },    // F (hold)
        { freq: 262, duration: 0.5 },    // C
        { freq: 262, duration: 0.5 },    // C
        { freq: 523, duration: 0.5 },    // C (high)
        { freq: 440, duration: 0.5 },    // A
        { freq: 349, duration: 0.5 },    // F
        { freq: 330, duration: 0.5 },    // E
        { freq: 294, duration: 0.5 },    // D
        { freq: 494, duration: 0.5 },    // B
        { freq: 440, duration: 1.5 }     // A (hold)
      ];
      
      let currentTime = startTime;
      
      // Play the melody
      melody.forEach((note) => {
        playNote(ctx, note.freq, currentTime, note.duration, 0.15);
        currentTime += note.duration;
      });
      
      // Add a short pause before saying the name
      const nameStartTime = currentTime + 0.3;
      
      // Create a singing effect for the name "Tanya"
      playNameSound(ctx, nameStartTime, name);
      
      // Calculate total duration
      const totalDuration = nameStartTime + 1.5 - startTime;
      
      // Resolve after the song finishes
      setTimeout(() => {
        resolve();
      }, totalDuration * 1000);
      
    } catch (error) {
      console.error("Could not play birthday song:", error);
      resolve();
    }
  });
};

/**
 * Play a single note
 */
function playNote(ctx: AudioContext, frequency: number, startTime: number, duration: number, volume: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, startTime);
  
  // Envelope
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - 0.05);
  
  osc.start(startTime);
  osc.stop(startTime + duration);
}

/**
 * Play a singing effect for the birthday person's name
 */
function playNameSound(ctx: AudioContext, startTime: number, name: string) {
  // Create a melodic effect for singing the name
  // Use higher pitches for a singing effect
  const namePitches = [
    { freq: 392, duration: 0.3 },   // G (for name start)
    { freq: 440, duration: 0.3 },   // A
    { freq: 494, duration: 0.6 },   // B (held longer)
  ];
  
  let currentTime = startTime;
  namePitches.forEach((note) => {
    playNote(ctx, note.freq, currentTime, note.duration, 0.12);
    currentTime += note.duration;
  });
}
