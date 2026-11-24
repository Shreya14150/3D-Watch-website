import * as THREE from 'three';

// Procedural texture generator for luxury watch dials and materials
// Guarantees zero network latency, zero 404s, and crisp retina resolution

// 1. Mother-of-Pearl iridescent procedural texture
export function createMotherOfPearlTexture(tone = 'pink') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base soft radial gradient
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
  if (tone === 'pink') {
    grad.addColorStop(0, '#FFF5F5');
    grad.addColorStop(0.35, '#FCE4E4');
    grad.addColorStop(0.7, '#F3D2D7');
    grad.addColorStop(1, '#E8C0C8');
  } else if (tone === 'emerald') {
    grad.addColorStop(0, '#134E35');
    grad.addColorStop(0.4, '#0B3322');
    grad.addColorStop(0.8, '#061F14');
    grad.addColorStop(1, '#020C08');
  } else if (tone === 'black') {
    grad.addColorStop(0, '#1A1A1E');
    grad.addColorStop(0.5, '#101014');
    grad.addColorStop(1, '#050507');
  } else {
    // Pure white mother of pearl
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.4, '#F7F7FA');
    grad.addColorStop(0.8, '#EAE9F0');
    grad.addColorStop(1, '#DEDDE6');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle concentric guilloché lathe grooves
  ctx.strokeStyle = tone === 'emerald' || tone === 'black' 
    ? 'rgba(255, 255, 255, 0.04)' 
    : 'rgba(212, 175, 55, 0.08)';
  ctx.lineWidth = 1;
  for (let r = 80; r < 480; r += 6) {
    ctx.beginPath();
    ctx.arc(512, 512, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Sunray radial lines
  const rays = 120;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const x1 = 512 + Math.cos(angle) * 80;
    const y1 = 512 + Math.sin(angle) * 80;
    const x2 = 512 + Math.cos(angle) * 500;
    const y2 = 512 + Math.sin(angle) * 500;
    ctx.strokeStyle = (i % 5 === 0) 
      ? 'rgba(255, 255, 255, 0.09)' 
      : 'rgba(255, 255, 255, 0.025)';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Subtle natural nacre shimmer clouds
  for (let i = 0; i < 40; i++) {
    const cx = 512 + (Math.random() - 0.5) * 600;
    const cy = 512 + (Math.random() - 0.5) * 600;
    const rad = 60 + Math.random() * 120;
    const nacreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    const alpha = tone === 'black' ? 0.02 : 0.045;
    nacreGrad.addColorStop(0, `rgba(255, 230, 240, ${alpha * 2})`);
    nacreGrad.addColorStop(0.5, `rgba(200, 240, 255, ${alpha})`);
    nacreGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nacreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // ÉVÉRA brand typography on dial
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '300 24px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = (tone === 'emerald' || tone === 'black') ? '#DFBE79' : '#33261D';
  ctx.letterSpacing = '6px';
  ctx.fillText('É V É R A', 512, 360);

  ctx.font = '300 10px "Montserrat", sans-serif';
  ctx.fillStyle = (tone === 'emerald' || tone === 'black') ? 'rgba(223, 190, 121, 0.7)' : 'rgba(70, 50, 40, 0.6)';
  ctx.fillText('AUTOMATIC', 512, 385);
  ctx.fillText('SWISS MADE', 512, 660);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// 2. Leather strap texture with subtle grain and edge stitching
export function createLeatherTexture(color = '#3A271D') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 1024);

  // Leather pebble noise
  const imgData = ctx.getImageData(0, 0, 512, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + grain));
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Stitched border lines
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.lineTo(30, 1004);
  ctx.moveTo(482, 20);
  ctx.lineTo(482, 1004);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 3. Côtes de Genève (Geneva Stripes) texture for movement baseplate
export function createGenevaStripesTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#CCCCCC';
  ctx.fillRect(0, 0, 512, 512);

  const stripeWidth = 32;
  for (let x = 0; x < 512; x += stripeWidth) {
    const stripeGrad = ctx.createLinearGradient(x, 0, x + stripeWidth, 0);
    stripeGrad.addColorStop(0, '#B0B0B5');
    stripeGrad.addColorStop(0.5, '#E8E8ED');
    stripeGrad.addColorStop(1, '#9E9EA4');
    ctx.fillStyle = stripeGrad;
    ctx.fillRect(x, 0, stripeWidth, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}
