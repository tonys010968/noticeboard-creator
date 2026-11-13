/* Starfall Works Noticeboard Creator — parchment rendering (v1.3)
 * Each notice uses a repeatable seed so exports match the editor.
 * All marks are clipped to the paper silhouette by the caller.
 */
(function () {
  'use strict';

  const seeded = (seed) => {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  };

  const stain = (ctx, x, y, radius, color, opacity) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color.replace('ALPHA', String(opacity)));
    gradient.addColorStop(0.55, color.replace('ALPHA', String(opacity * 0.45)));
    gradient.addColorStop(1, color.replace('ALPHA', '0'));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  window.drawParchmentTexture = function drawParchmentTexture(ctx, notice, index, width, height) {
    const style = notice.paper || 'aged';
    const seed = index * 97 + 17;
    const left = -width / 2;
    const top = -height / 2;

    ctx.save();

    // Fine fiber grain, uneven pigmentation and paper pores.
    for (let i = 0; i < 950; i++) {
      const x = left + seeded(seed + i * 3) * width;
      const y = top + seeded(seed + i * 3 + 1) * height;
      const size = 0.25 + seeded(seed + i * 3 + 2) * 2.2;
      ctx.globalAlpha = 0.035 + seeded(i + seed) * 0.12;
      ctx.fillStyle = i % 3 === 0 ? '#fff9e3' : '#71502d';
      ctx.fillRect(x, y, size * 2.8, size * 0.65);
    }
    ctx.globalAlpha = 1;

    if (style !== 'pristine') {
      const edge = ctx.createRadialGradient(0, 0, width * 0.15, 0, 0, width * 0.73);
      edge.addColorStop(0, 'rgba(85,49,21,0)');
      edge.addColorStop(1, style === 'tattered' || style === 'soiled'
        ? 'rgba(64,35,15,0.48)' : 'rgba(90,55,24,0.24)');
      ctx.fillStyle = edge;
      ctx.fillRect(left, top, width, height);
    }

    if (['weathered', 'tattered', 'patched'].includes(style)) {
      ctx.strokeStyle = 'rgba(75,51,33,0.19)';
      ctx.lineWidth = Math.max(2, width * 0.009);
      ctx.beginPath();
      ctx.moveTo(left, top + height * 0.48);
      ctx.lineTo(width / 2, top + height * 0.53);
      ctx.moveTo(left + width * 0.52, top);
      ctx.lineTo(left + width * 0.48, height / 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,252,228,0.22)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (['stained', 'water', 'soiled', 'blood'].includes(style)) {
      const count = style === 'blood' ? 15 : style === 'soiled' ? 22 : 7;
      for (let i = 0; i < count; i++) {
        const x = left + seeded(seed + i * 7) * width;
        const y = top + seeded(seed + i * 7 + 1) * height;
        const radius = Math.min(width, height) * (0.045 + seeded(seed + i * 7 + 2) * 0.15);
        const ink = style === 'blood' ? 'rgba(106,14,13,ALPHA)'
          : style === 'soiled' ? 'rgba(52,43,30,ALPHA)'
          : style === 'water' ? 'rgba(94,79,62,ALPHA)'
          : 'rgba(125,75,31,ALPHA)';
        stain(ctx, x, y, radius, ink, style === 'blood' ? 0.42 : 0.22);
      }
    }

    if (style === 'water' || style === 'stained') {
      for (let i = 0; i < 4; i++) {
        const x = left + seeded(seed + 500 + i) * width;
        const y = top + seeded(seed + 600 + i) * height;
        ctx.strokeStyle = style === 'water' ? 'rgba(100,79,54,0.24)' : 'rgba(113,72,31,0.28)';
        ctx.lineWidth = Math.max(2, width * 0.008);
        ctx.beginPath();
        ctx.ellipse(x, y, width * 0.10, height * 0.07, seeded(i + seed), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    if (style === 'blood') {
      // Stylized dark-red splatter, not a photograph of an injury.
      for (let i = 0; i < 26; i++) {
        const x = left + seeded(seed + 800 + i * 2) * width;
        const y = top + seeded(seed + 801 + i * 2) * height;
        ctx.fillStyle = 'rgba(104,18,14,0.35)';
        ctx.beginPath();
        ctx.ellipse(x, y, 1.5 + seeded(i) * 5, 2 + seeded(i + 9) * 9, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (style === 'patched') {
      ctx.fillStyle = 'rgba(207,179,129,0.7)';
      ctx.fillRect(width * 0.22, -height * 0.42, width * 0.25, height * 0.22);
      ctx.strokeStyle = 'rgba(84,59,37,0.65)';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(width * 0.22, -height * 0.42, width * 0.25, height * 0.22);
      ctx.setLineDash([]);
    }

    ctx.restore();
  };
})();
