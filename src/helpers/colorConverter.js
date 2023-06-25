// Convert HSV to HEX
export function hsvToHex({ h, s, v }) {
  h = h % 360;
  if (h < 0) {
    h += 360;
  }

  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let rgb = [0, 0, 0];

  if (h >= 0 && h < 60) {
    rgb = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    rgb = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    rgb = [0, c, x];
  } else if (h >= 180 && h < 240) {
    rgb = [0, x, c];
  } else if (h >= 240 && h < 300) {
    rgb = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    rgb = [c, 0, x];
  }

  // Convert RGB to HEX
  let r = Math.round((rgb[0] + m) * 255);
  let g = Math.round((rgb[1] + m) * 255);
  let b = Math.round((rgb[2] + m) * 255);

  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export function hexToHsv(hex) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);

  // Calculate the hue
  let h = 0;
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = (60 * ((g - b) / (max - min)) + 360) % 360;
  } else if (max === g) {
    h = (60 * ((b - r) / (max - min)) + 120) % 360;
  } else if (max === b) {
    h = (60 * ((r - g) / (max - min)) + 240) % 360;
  }
  let s = max === 0 ? 0 : (max - min) / max;
  let v = max;
  return { hue: h, saturation: s, brightness: v };
}
