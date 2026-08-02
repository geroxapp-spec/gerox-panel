export function drawProductImage(ctx, productImg){
  if(!productImg) return;

  const imgW = productImg.naturalWidth  || productImg.width  || 800;
  const imgH = productImg.naturalHeight || productImg.height || 800;

  const areaX = 560;
  const areaY = 160;
  const areaW = 520;
  const areaH = 520;

  const ratio = Math.min(areaW/imgW, areaH/imgH);
  const drawW = imgW*ratio;
  const drawH = imgH*ratio;
  const drawX = areaX + (areaW-drawW)/2;
  const drawY = areaY + (areaH-drawH)/2;
  const cx = drawX+drawW/2;
  const cy = drawY+drawH/2;

  // Sıcak glow
  ctx.save();
  const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, drawW*0.90);
  glow.addColorStop(0,   "rgba(255,190,40,0.22)");
  glow.addColorStop(0.5, "rgba(200,90,0,0.10)");
  glow.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(areaX-100, areaY-100, areaW+200, areaH+200);
  ctx.restore();

  // İnce dekoratif çember (arka planda, hafif)
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = "#FFC94D";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(cx-30, cy-60, drawW*0.68, 0, Math.PI*2);
  ctx.stroke();
  ctx.restore();

  // Zemin gölgesi
  ctx.save();
  const shadow = ctx.createRadialGradient(cx, drawY+drawH, 10, cx, drawY+drawH+6, drawW*0.42);
  shadow.addColorStop(0,    "rgba(0,0,0,0.75)");
  shadow.addColorStop(0.55, "rgba(0,0,0,0.35)");
  shadow.addColorStop(1,    "rgba(0,0,0,0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(cx, drawY+drawH+6, drawW*0.40, 26, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Ürün görseli
  ctx.save();
  ctx.filter = "saturate(1.28) contrast(1.14) drop-shadow(0 18px 40px rgba(0,0,0,0.72))";
  ctx.drawImage(productImg, drawX, drawY, drawW, drawH);
  ctx.filter = "none";
  ctx.restore();
}
