// Luxury Wedding Melody Synthesizer & Audio Player
// Generates gentle romantic ambient piano/harp tones using Web Audio API
// with zero external audio file dependencies, plus custom uploaded file playback.

class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customSrc: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic Canon / Wedding Chords progression (frequencies in Hz)
  private readonly chords = [
    // D Major: D3, F#3, A3, D4, F#4
    [146.83, 185.00, 220.00, 293.66, 369.99],
    // A Major: A2, E3, A3, C#4, E4
    [110.00, 164.81, 220.00, 277.18, 329.63],
    // B Minor: B2, F#3, B3, D4, F#4
    [123.47, 185.00, 246.94, 293.66, 369.99],
    // F# Minor: F#2, C#3, F#3, A3, C#4
    [92.50, 138.59, 185.00, 220.00, 277.18],
    // G Major: G2, D3, G3, B3, D4
    [98.00, 146.83, 196.00, 246.94, 293.66],
    // D Major / F#: D3, A3, D4, F#4
    [146.83, 220.00, 293.66, 369.99],
    // G Major: G2, G3, B3, D4, G4
    [98.00, 196.00, 246.94, 293.66, 392.00],
    // A Major: A2, E3, A3, C#4, E4
    [110.00, 164.81, 220.00, 277.18, 329.63]
  ];

  private playTone(freq: number, startTime: number, duration: number, gainValue = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Gentle sine / triangle wave for romantic music-box / harp feel
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(gainValue * 0.4, startTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Subtle low-pass filter to soften the acoustic timbre
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  public setCustomAudio(src: string | null) {
    this.customSrc = src;
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (src) {
      this.customAudio = new Audio(src);
      this.customAudio.loop = true;
    }
  }

  public play() {
    this.isPlaying = true;
    if (this.customAudio && this.customSrc) {
      this.customAudio.play().catch(e => console.warn('Custom audio playback postponed:', e));
      return;
    }

    this.initContext();
    if (!this.ctx) return;

    let chordIndex = 0;
    const playNextBar = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = this.chords[chordIndex % this.chords.length];

      // Arpeggiate notes gracefully like a harp / royal music box
      notes.forEach((freq, i) => {
        const noteTime = now + (i * 0.35);
        this.playTone(freq, noteTime, 2.2, 0.06 - (i * 0.007));
      });

      // Play soft top melody bell
      const bellFreq = notes[notes.length - 1] * (chordIndex % 2 === 0 ? 1.5 : 2.0);
      this.playTone(bellFreq, now + 1.2, 1.8, 0.035);

      chordIndex++;
      this.timer = window.setTimeout(playNextBar, 2200);
    };

    playNextBar();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(customUrl?: string): boolean {
    if (customUrl !== undefined && customUrl !== this.customSrc) {
      this.setCustomAudio(customUrl);
    }
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const royalAudioEngine = new LuxuryAudioEngine();
