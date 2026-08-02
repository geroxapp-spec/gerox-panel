import {money, splitMoney} from "./utils.js";

function roundRectCorners(ctx, x, y, w, h, r){
  const tl=r.tl||0, tr=r.tr||0, br=r.br||0, bl=r.bl||0;
  ctx.beginPath();
  ctx.moveTo(x+tl, y);
  ctx.lineTo(x+w-tr, y);
  ctx.arcTo(x+w, y, x+w, y+tr, tr);
  ctx.lineTo(x+w, y+h-br);
  ctx.arcTo(x+w, y+h, x+w-br, y+h, br);
  ctx.lineTo(x+bl, y+h);
  ctx.arcTo(x, y+h, x, y+h-bl, bl);
  ctx.lineTo(x, y+tl);
  ctx.arcTo(x, y, x+tl, y, tl);
  ctx.closePath();
}

export function drawPriceBlock(ctx, deal, layout){
  const old  = Number(deal.old_price||0);
  const nw   = Number(deal.new_price||0);
  const disc = old>0 ? Math.max(0, Math.round(((old-nw)/old)*100)) : 0;

  const { cardX, cardW, cardBottomY, priceAreaH, padX, cardR } = layout;

  const goldY = cardBottomY - priceAreaH;
  const goldH = priceAreaH;

  // ---------- Eski fiyat + İndirim rozeti (yan yana, gold barın üstü) ----------
  let oldPriceEndX = cardX + padX;
  if(old>0){
    const txt = money(old);
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 30px Arial";
    const oldY = goldY - 20;
    ctx.fillText(txt, cardX+padX, oldY);
    const tw = ctx.measureText(txt).width;
    ctx.strokeStyle = "rgba(255,60,60,0.9)";
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(cardX+padX, oldY-12);
    ctx.lineTo(cardX+padX+tw, oldY-12);
    ctx.stroke();
    ctx.restore();
    oldPriceEndX = cardX + padX + tw;
  }

  if(disc>0){
    const bw = 118, bh = 54;
    const notch = 14;
    const bx = oldPriceEndX + 24;
    const by = goldY - 20 - bh/2 - 4;

    ctx.save();
    ctx.shadowColor = "rgba(180,0,0,0.5)";
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(bx+notch, by);
    ctx.lineTo(bx+bw, by);
    ctx.arcTo(bx+bw+10, by, bx+bw+10, by+bh, 8);
    ctx.lineTo(bx+bw+10, by+bh);
    ctx.lineTo(bx+notch, by+bh);
    ctx.lineTo(bx, by+bh/2);
    ctx.closePath();

    const rg = ctx.createLinearGradient(bx, by, bx+bw, by+bh);
    rg.addColorStop(0, "#D40000");
    rg.addColorStop(1, "#FF3300");
    ctx.fillStyle = rg;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 26px Arial Black, Arial";
    ctx.fillText("%"+disc, bx+bw/2+8, by+bh/2+3);

    ctx.font = "700 14px Arial";
    ctx.fillStyle = "#FFE3E3";
    ctx.fillText("İNDİRİM", bx+bw/2+8, by+bh-8);
    ctx.restore();
  }

  // ---------- Altın alt bar (kartla kaynaşmış, 3D bevel) ----------
  ctx.save();
  roundRectCorners(ctx, cardX, goldY, cardW, goldH, {tl:0, tr:0, br:cardR, bl:cardR});
  const pg = ctx.createLinearGradient(cardX, goldY, cardX, goldY+goldH);
  pg.addColorStop(0,    "#8B6200");
  pg.addColorStop(0.18, "#FFD700");
  pg.addColorStop(0.55, "#F2B800");
  pg.addColorStop(1,    "#9C7100");
  ctx.fillStyle = pg;
  ctx.fill();
  ctx.restore();

  // Üst kabarık kenar (bevel)
  ctx.save();
  roundRectCorners(ctx, cardX, goldY, cardW, 6, {tl:0, tr:0, br:0, bl:0});
  ctx.fillStyle = "rgba(90,60,0,0.9)";
  ctx.fill();
  ctx.restore();

  // İç parlaklık çizgisi
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,220,0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX+8, goldY+8);
  ctx.lineTo(cardX+cardW-8, goldY+8);
  ctx.stroke();
  ctx.restore();

  // ---------- Yeni fiyat (büyütülmüş) ----------
  const p = splitMoney(nw);
  let size = 108;
  ctx.font = "900 "+size+"px Impact, Arial Black, Arial";
  while(ctx.measureText(p.lira).width > cardW-180 && size>72) size -= 4;

  const fy = goldY + goldH - 26;
  const fx = cardX + padX;

  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "#1a0f00";
  ctx.font = "900 "+size+"px Impact, Arial Black, Arial";
  ctx.fillText(p.lira, fx, fy);
  const lw = ctx.measureText(p.lira).width;

  ctx.font = "900 "+Math.round(size*0.46)+"px Impact, Arial Black, Arial";
  ctx.fillText(","+p.kurus, fx+lw+6, fy-6);
  const kw = ctx.measureText(","+p.kurus).width;

  ctx.font = "700 "+Math.round(size*0.40)+"px Arial";
  ctx.fillText("₺", fx+lw+kw+16, fy-6);
  ctx.restore();
}
