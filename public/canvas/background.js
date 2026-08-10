export function drawBackground(ctx, productImg){
  const W = 1080;
  const H = 1080;

  // Ana koyu zemin
  const base = ctx.createRadialGradient(540, 460, 80, 540, 540, 900);
  base.addColorStop(0, "#211400");
  base.addColorStop(0.45, "#0d0800");
  base.addColorStop(1, "#000000");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Sağ ürün arkası sıcak ışık
  const rightGlow = ctx.createRadialGradient(815, 460, 60, 815, 460, 520);
  rightGlow.addColorStop(0, "rgba(255,185,25,0.34)");
  rightGlow.addColorStop(0.35, "rgba(190,90,0,0.20)");
  rightGlow.addColorStop(0.72, "rgba(70,35,0,0.10)");
  rightGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = rightGlow;
  ctx.fillRect(0, 0, W, H);

  // Sol üst altın toz patlaması
  const leftSpark = ctx.createRadialGradient(40, 140, 10, 40, 140, 360);
  leftSpark.addColorStop(0, "rgba(255,200,30,0.30)");
  leftSpark.addColorStop(0.35, "rgba(255,160,0,0.12)");
  leftSpark.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = leftSpark;
  ctx.fillRect(0, 0, W, H);

  // Alt zemin / sahne ışığı
  const floor = ctx.createLinearGradient(0, 675, 0, 980);
  floor.addColorStop(0, "rgba(255,170,0,0.05)");
  floor.addColorStop(0.45, "rgba(110,55,0,0.13)");
  floor.addColorStop(1, "rgba(0,0,0,0.75)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, 650, W, 360);

  // İnce ufuk çizgisi
  ctx.save();
  ctx.strokeStyle = "rgba(255,180,0,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 770);
  ctx.lineTo(1040, 770);
  ctx.stroke();
  ctx.restore();

  // Ürün arkası büyük dekoratif yay
  ctx.save();
  ctx.globalAlpha = 0.38;
  ctx.strokeStyle = "rgba(255,180,20,0.55)";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(255,160,0,0.55)";
  ctx.shadowBlur = 22;
  ctx.beginPath();
  ctx.arc(810, 485, 335, Math.PI * 1.08, Math.PI * 1.93);
  ctx.stroke();
  ctx.restore();

  // İkinci çok ince yay
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "rgba(255,205,70,0.42)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(810, 500, 365, Math.PI * 1.06, Math.PI * 1.95);
  ctx.stroke();
  ctx.restore();

  // Altın tozlar
  drawGoldDust(ctx, W, H);

  // Üst logo alanı karartması
  const top = ctx.createLinearGradient(0, 0, 0, 160);
  top.addColorStop(0, "rgba(0,0,0,0.86)");
  top.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, W, 170);

  // Kenar vignette
  const vig = ctx.createRadialGradient(540, 500, 260, 540, 500, 820);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.78)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);
}

function drawGoldDust(ctx, W, H){
  const rnd = mulberry32(77);

  ctx.save();

  for(let i = 0; i < 520; i++){
    const x = rnd() * W;
    const y = rnd() * H;
    const r = rnd() * 1.7 + 0.25;
    const a = rnd() * 0.50 + 0.04;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,190,20," + a + ")";
    ctx.fill();
  }

  // Sol üstte daha yoğun toz
  for(let i = 0; i < 180; i++){
    const x = rnd() * 260;
    const y = rnd() * 260;
    const r = rnd() * 2.2 + 0.3;
    const a = rnd() * 0.55 + 0.06;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,175,0," + a + ")";
    ctx.fill();
  }

  ctx.restore();
}

function mulberry32(seed){
  let s = seed;
  return function(){
    s |= 0;
    s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
