export function drawProductImage(ctx, productImg){
  if(!productImg) return;

  const imgW = productImg.naturalWidth  || productImg.width  || 800;
  const imgH = productImg.naturalHeight || productImg.height || 800;

  const areaX = 500;
  const areaY = 150;
  const areaW = 560;
  const areaH = 740;

  const ratio = Math.min(areaW/imgW, areaH/imgH);
  const drawW = imgW*ratio;
  const drawH = imgH*ratio;
  const drawX = areaX + (areaW-drawW)/2;
  const drawY = areaY + (areaH-drawH)/2;
  const cx = drawX+drawW/2;
  const cy = drawY+drawH/2;

  // Yumuşak sıcak glow (bant yok, portal görünmüyor)
  ctx.save();
  const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, drawW*0.85);
  glow.addColorStop(0,   "rgba(255,190,40,0.22)");
  glow.addColorStop(0.5, "rgba(200,90,0,0.10)");
  glow.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(areaX-80, areaY-80, areaW+160, areaH+160);
  ctx.restore();

  // İnce dekoratif çember (çok hafif, referanstaki gibi)
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "#FFC94D";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(cx, cy-20, drawW*0.62, 0, Math.PI*2);
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
  ctx.ellipse(cx, drawY+drawH+6, drawW*0.40, 24, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Ürün görseli
  ctx.save();
  ctx.filter = "saturate(1.25) contrast(1.12) drop-shadow(0 16px 36px rgba(0,0,0,0.70))";
  ctx.drawImage(productImg, drawX, drawY, drawW, drawH);
  ctx.filter = "none";
  ctx.restore();
}
