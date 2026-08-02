export function drawProductImage(ctx, productImg){
  if(!productImg) return;

  const imgW = productImg.naturalWidth || productImg.width || 800;
  const imgH = productImg.naturalHeight || productImg.height || 800;

  // Referanstaki gibi sağ tarafı dolduran ürün alanı
  const areaX = 560;
  const areaY = 210;
  const areaW = 500;
  const areaH = 610;

  let ratio = Math.min(areaW / imgW, areaH / imgH);

  // Ürünü biraz büyütüyoruz; referanstaki doluluk için gerekli
  ratio *= 1.16;

  const drawW = imgW * ratio;
  const drawH = imgH * ratio;

  const drawX = areaX + (areaW - drawW) / 2;
  const drawY = areaY + (areaH - drawH) / 2 + 25;

  const cx = drawX + drawW / 2;
  const cy = drawY + drawH / 2;

  // Ürün arkası sıcak glow
  ctx.save();
  const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, drawW * 0.72);
  glow.addColorStop(0, "rgba(255,190,40,0.28)");
  glow.addColorStop(0.45, "rgba(180,80,0,0.14)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(areaX - 120, areaY - 120, areaW + 240, areaH + 240);
  ctx.restore();

  // Ürün altı zemin gölgesi
  ctx.save();
  const shadow = ctx.createRadialGradient(
    cx,
    drawY + drawH - 12,
    10,
    cx,
    drawY + drawH + 18,
    drawW * 0.55
  );

  shadow.addColorStop(0, "rgba(0,0,0,0.85)");
  shadow.addColorStop(0.45, "rgba(0,0,0,0.42)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(cx, drawY + drawH + 18, drawW * 0.48, 34, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Ürünün kendisi
  ctx.save();
  ctx.filter =
    "saturate(1.28) contrast(1.12) " +
    "drop-shadow(0 18px 42px rgba(0,0,0,0.82))";
  ctx.drawImage(productImg, drawX, drawY, drawW, drawH);
  ctx.filter = "none";
  ctx.restore();

  // Alt refle parlaklığı
  ctx.save();
  ctx.globalAlpha = 0.20;
  const ref = ctx.createRadialGradient(cx, 820, 20, cx, 820, 260);
  ref.addColorStop(0, "rgba(255,170,0,0.22)");
  ref.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = ref;
  ctx.fillRect(430, 710, 650, 180);
  ctx.restore();
}
