export function drawProductImage(ctx, productImg){
  if(!productImg){
    ctx.save();
    ctx.textAlign="center";
    ctx.fillStyle="rgba(255,255,255,0.08)";
    ctx.font="500 26px Arial";
    ctx.fillText("Görsel Bulunamadı", 720, 490);
    ctx.restore();
    return;
  }

  const imgW = productImg.naturalWidth  || productImg.width  || 800;
  const imgH = productImg.naturalHeight || productImg.height || 800;

  // Ürünün sığacağı alan - sağ taraf
  const areaX = 340;
  const areaY = 160;
  const areaW = 700;
  const areaH = 660;

  // Orantılı boyut hesapla (contain)
  const ratio  = Math.min(areaW / imgW, areaH / imgH);
  const drawW  = imgW * ratio;
  const drawH  = imgH * ratio;

  // Alanın ortasına hizala
  const drawX  = areaX + (areaW - drawW) / 2;
  const drawY  = areaY + (areaH - drawH) / 2;

  // Zemin gölgesi (elips)
  ctx.save();
  const shadow = ctx.createRadialGradient(
    drawX + drawW/2, drawY + drawH - 10, 10,
    drawX + drawW/2, drawY + drawH + 20, drawW * 0.52
  );
  shadow.addColorStop(0, "rgba(0,0,0,0.70)");
  shadow.addColorStop(0.5,"rgba(0,0,0,0.35)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(
    drawX + drawW/2,
    drawY + drawH + 18,
    drawW * 0.48,
    38,
    0, 0, Math.PI * 2
  );
  ctx.fill();
  ctx.restore();

  // Ürün arkası sıcak halo
  ctx.save();
  const halo = ctx.createRadialGradient(
    drawX + drawW/2, drawY + drawH/2, 40,
    drawX + drawW/2, drawY + drawH/2, drawW * 0.72
  );
  halo.addColorStop(0, "rgba(255,210,60,0.20)");
  halo.addColorStop(0.5,"rgba(255,140,0,0.08)");
  halo.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(areaX - 40, areaY - 40, areaW + 80, areaH + 80);
  ctx.restore();

  // Ürün görseli
  ctx.save();
  ctx.filter =
    "saturate(1.20) contrast(1.10) " +
    "drop-shadow(0px 12px 28px rgba(0,0,0,0.65))";
  ctx.drawImage(productImg, drawX, drawY, drawW, drawH);
  ctx.filter = "none";
  ctx.restore();

  // Sol fade (yazıyla çakışmasın)
  const leftFade = ctx.createLinearGradient(310, 0, 560, 0);
  leftFade.addColorStop(0, "rgba(0,0,0,1)");
  leftFade.addColorStop(0.65,"rgba(0,0,0,0.50)");
  leftFade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = leftFade;
  ctx.fillRect(290, 140, 290, 760);

  // Alt fade (fiyat alanına geçiş)
  const bottomFade = ctx.createLinearGradient(0, 730, 0, 870);
  bottomFade.addColorStop(0, "rgba(0,0,0,0)");
  bottomFade.addColorStop(1, "rgba(0,0,0,0.95)");
  ctx.fillStyle = bottomFade;
  ctx.fillRect(300, 720, 820, 180);
}
