const colorVars = (args) => {
  const myColors = args && args.length > 0 ? args.map(color => `--${color}`) : [
    '--whiteVar', '--lightAccentVar', '--accentVar', '--darkAccentVar', '--blackVar'
  ];

  const cssVars = ['--white-hsl', '--lightAccent-hsl', '--accent-hsl', '--darkAccent-hsl', '--black-hsl'];

  cssVars.forEach((v, i) => {
    const hsl = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    if (hsl) {
      const hex = hslToHex(hsl);
      document.documentElement.style.setProperty(myColors[i], hex);
    }
  });

  console.log('Colors have been set.');
};

const hslToHex = (hsl) => {
  const [hue, saturation, lightness] = hsl.match(/[\d.]+/g);
  const h = Number(hue) / 360;
  const s = Number(saturation) / 100;
  const l = Number(lightness) / 100;

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hueToRgb(p, q, h) * 255);
  const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
colorVars();