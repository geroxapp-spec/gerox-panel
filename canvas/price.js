import {money, splitMoney, rr} from "./utils.js";

// Sağı sivri biten kurdele/flama şekli
function drawRibbon(ctx, x, y, w, h, discText){
  const notch = h*0.42;

  ctx.save();
  ctx.shadowColor = "rgba(160,0,0,0.55)";
  ctx.shadowBlur = 16;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+w-notch, y);
  ctx.lineTo(x+w, y+h/2);
  ctx.lineTo(x+w-notch, y+h);
  ctx.lineTo(x, y+h);
  ctx.closePath();

  const rg = ctx.createLinearGradient(x, y, x, y+h);
  rg.addColorStop(0, "#D40000");
  rg.addColorStop(1, "#8E0000");
  ctx.fillStyle = rg;
  ctx.fill();

  ctx.strokeStyle = "rgba(255,170,170,0.45)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();

  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 30px Arial Black, Arial";
  ctx.fillText("%"+discText, x+18, y+h*0.42);

  ctx.fillStyle = "#FFD9D9";
  ctx.font = "700 18px Arial";
  ctx.fillText("İNDİRİM", x+18, y+h*0.42+24);
  ctx.restore();
}

export function drawPriceBlock(ctx, deal, layout){
  const old  = Number(deal.old_price||0);
  const nw   = Number(deal.new_price||0);
  const disc = old>0 ? Math.max(0, Math.round(((old-nw)/old)*100)) : 0;

  const { cardX, cardW, cardBottomY, oldPriceRowY, padX, cardR } = layout;

  // ---------- Eski fiyat ----------
  let oldTxtW = 0;
  if(old>0){
    const txt = money(old);
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 30px Arial";
    ctx.fillText(txt, cardX+padX, oldPriceRowY);
    oldTxtW = ctx.measureText(txt).width;
    ctx.strokeStyle = "rgba(255,80,80,0.90)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cardX+padX, oldPriceRowY-11);
    ctx.lineTo(cardX+padX+oldTxtW, oldPriceRowY-11);
    ctx.stroke();
    ctx.restore();
  }

  // ---------- İndirim kurdelesi (eski fiyatın sağında, aynı sırada) ----------
  if(disc>0){
    const ribbonW = 190;
    const ribbonH = 72;
    const ribbonX = cardX + cardW - padX - ribbonW + 20;
    const ribbonY = oldPriceRowY - ribbonH + 22;
    drawRibbon(ctx, ribbonX, ribbonY, ribbonW, ribbonH, disc);
  }

  // ---------- Kartın üstüne binen "altın plaka" ----------
  const plateW = cardW + 70;
  const plateH = 210;
  const plateX = cardX - 8;
  const plateY = cardBottomY - 66;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 14;
  rr(ctx, plateX, plateY, plateW, plateH, 26);
  const pg = ctx.createLinearGradient(plateX, plateY, plateX, plateY+plateH);
  pg.addColorStop(0,    "#FFE066");
  pg.addColorStop(0.22, "#FFD700");
  pg.addColorStop(0.6,  "#F0B400");
  pg.addColorStop(1,    "#8A6100");
  ctx.fillStyle = pg;
  ctx.fill();
  ctx.restore();

  // İç kabartma çerçeve (embossed görünüm)
  ctx.save();
  rr(ctx, plateX+6, plateY+6, plateW-12, plateH-12, 20);
  ctx.strokeStyle = "rgba(80,55,0,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();

  rr(ctx, plateX+2, plateY+2, plateW-4, plateH-4, 24);
  ctx.strokeStyle = "rgba(255,255,210,0.55)";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();

  // ---------- Yeni fiyat ----------
  const p = splitMoney(nw);
  let size = 108;
  ctx.font = "900 "+size+"px Arial Black, Arial";
  while(ctx.measureText(p.lira).width > plateW-260 && size>68) size -= 4;

  const fy = plateY + plateH - 46;
  const fx = plateX + 40;

  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "#1a0f00";
  ctx.font = "900 "+size+"px Arial Black, Arial";
  ctx.fillText(p.lira, fx, fy);
  const lw = ctx.measureText(p.lira).width;

  ctx.font = "900 "+Math.round(size*0.46)+"px Arial Black, Arial";
  ctx.fillText(","+p.kurus, fx+lw+8, fy-8);
  const kw = ctx.measureText(","+p.kurus).width;

  ctx.font = "700 "+Math.round(size*0.40)+"px Arial";
  ctx.fillText("₺", fx+lw+kw+20, fy-8);
  ctx.restore();
}
