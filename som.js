// — SOM —
function tocarSom() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392,
    A4: 440, Bb4: 466.16, B4: 493.88, C5: 523.25, D5: 587.33,
    E5: 659.25, F5: 698.46, G5: 783.99, A5: 880
  };

  const melody = [
    {n:'Bb4', d:0.35}, {n:'D5', d:0.35}, {n:'F5', d:0.35},
    {n:'E5', d:0.35},  {n:'D5', d:0.35}, {n:'C5', d:0.35},

    {n:'Bb4', d:0.35}, {n:'D5', d:0.35}, {n:'F5', d:0.35},
    {n:'G5', d:0.35},  {n:'F5', d:0.35}, {n:'D5', d:0.35},

    {n:'C5', d:0.45},  {n:'C5', d:0.45}, {n:'D5', d:0.45},
    {n:'E5', d:0.45},

    {n:'F5', d:0.4},  {n:'G5', d:0.4},  {n:'A5', d:0.4},
    {n:'G5', d:0.4},  {n:'F5', d:0.4},  {n:'D5', d:0.4},
    {n:'C5', d:0.8},

    {n:'Bb4', d:0.4}, {n:'C5', d:0.4}, {n:'D5', d:0.4}, {n:'C5', d:0.4},
    {n:'Bb4', d:0.8}
  ];

  const loopDuration = melody.reduce((sum, note) => sum + note.d, 0);
  let nextStartTime = ctx.currentTime + 0.2;

  function scheduleMelody(startTime) {
    let t = startTime;

    melody.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.value = notes[note.n];

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.5, t + 0.1);
      gain.gain.linearRampToValueAtTime(0.3, t + note.d - 0.05);
      gain.gain.linearRampToValueAtTime(0, t + note.d + 0.1);

      osc.connect(filter).connect(gain).connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d + 0.15);

      t += note.d;
    });

    setTimeout(() => {
      scheduleMelody(ctx.currentTime + 0.2);
    }, (loopDuration - 0.1) * 1000);
  }

  scheduleMelody(nextStartTime);
}

