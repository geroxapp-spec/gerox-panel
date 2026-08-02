import { money, splitMoney } from "./utils.js";

function roundedRect(ctx, x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function drawPriceBlock(ctx, deal, layout){
  const old = Number(deal.old_price || 0);
  const nw = Number(deal.new_price || 0);
  const disc = old > 0 ? Math.max(0, Math.round(((old - nw) / old) * 100)) : 0;

  const priceX = layout.priceX;
  const priceY = layout.priceY;
  const priceW = layout.priceW;
  const priceH = layout.priceH;

  // Eski fiyat
  if(old > 0){
    const txt = money(old);

    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "800 40px Arial Black, Arial";
    ctx.fillText(txt, priceX + 54, priceY - 42);

    const tw = ctx.measureText(txt).width;

    ctx.strokeStyle = "#D92218";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(priceX + 48, priceY - 55);
    ctx.lineTo(priceX + 60 + tw, priceY - 55);
    ctx.stroke();

    ctx.restore();
  }

  // Altın fiyat plakası dış gölge
  ctx.save();
  ctx.shadowColor = "rgba(255,180,0,0.60)";
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 8;

  roundedRect(ctx, priceX, priceY, priceW, priceH, 26);

  const grad = ctx.createLinearGradient(priceX, priceY, priceX, priceY + priceH);
  grad.addColorStop(0, "#FFF07A");
  grad.addColorStop(0.18, "#FFD21A");
  grad.addColorStop(0.52, "#EAA900");
  grad.addColorStop(0.82, "#C88700");
  grad.addColorStop(1, "#7A4A00");

  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,190,0.75)";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();

  // Plaka iç parlama
  ctx.save();
  roundedRect(ctx, priceX + 10, priceY + 10, priceW - 20, priceH - 20, 20);
  const shine = ctx.createLinearGradient(priceX, priceY, priceX, priceY + 80);
  shine.addColorStop(0, "rgba(255,255,255,0.38)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.fill();
  ctx.restore();

  // İç kenar çizgisi
  ctx.save();
  roundedRect(ctx, priceX + 10, priceY + 10, priceW - 20, priceH - 20, 19);
  ctx.strokeStyle = "rgba(120,70,0,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Yeni fiyat
  const p = splitMoney(nw);

  let size = 170;

  ctx.font = "900 " + size + "px Impact, Arial Black, Arial";

  while(ctx.measureText(p.lira).width > priceW - 230 && size > 95){
    size -= 6;
    ctx.font = "900 " + size + "px Impact, Arial Black, Arial";
  }

  const fx = priceX + 54;
  const fy = priceY + priceH - 42;

  ctx.save();

  ctx.textAlign = "left";
  ctx.fillStyle = "#120B00";
  ctx.shadowColor = "rgba(255,255,210,0.24)";
  ctx.shadowBlur = 3;

  // Ana lira
  ctx.font = "900 " + size + "px Impact, Arial Black, Arial";
  ctx.fillText(p.lira, fx, fy);

  const lw = ctx.measureText(p.lira).width;

  // Kuruş
  ctx.font = "900 " + Math.round(size * 0.46) + "px Impact, Arial Black, Arial";
  ctx.fillText("," + p.kurus, fx + lw + 12, fy - 16);

  const kw = ctx.measureText("," + p.kurus).width;

  // TL
  ctx.font = "800 " + Math.round(size * 0.42) + "px Arial Black, Arial";
  ctx.fillText("₺", fx + lw + kw + 30, fy - 16);

  ctx.restore();

  // İndirim etiketi
  if(disc > 0){
    const badgeW = 220;
    const badgeH = 118;
    const bx = priceX + priceW - 200;
    const by = priceY - 118;

    ctx.save();

    ctx.translate(bx + badgeW / 2, by + badgeH / 2);
    ctx.rotate(-3 * Math.PI / 180);

    ctx.shadowColor = "rgba(150,0,0,0.60)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;

    roundedRect(ctx, -badgeW / 2, -badgeH / 2, badgeW, badgeH, 18);

    const red = ctx.createLinearGradient(-badgeW / 2, -badgeH / 2, badgeW / 2, badgeH / 2);
    red.addColorStop(0, "#9D0000");
    red.addColorStop(0.48, "#E00000");
    red.addColorStop(1, "#FF2A00");

    ctx.fillStyle = red;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,210,170,0.75)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.shadowBlur = 0;

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 52px Arial Black, Arial";
    ctx.fillText("%" + disc, 0, -8);

    ctx.fillStyle = "#FFE7E7";
    ctx.font = "900 30px Arial Black, Arial";
    ctx.fillText("İNDİRİM", 0, 36);

    ctx.restore();
  }
}
