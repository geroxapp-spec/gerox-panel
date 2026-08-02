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

  // ---------- Eski fiyat (gold barın hemen üstü) ----------
  if(old>0){
    const txt = money(old);
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 28px Arial";
    const oldY = goldY - 16;
    ctx.fillText(txt, cardX+padX, oldY);
    const tw = ctx.measureText(txt).width;
    ctx.strokeStyle = "rgba(255,90,90,0.85)";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(cardX+padX, oldY-11);
    ctx.lineTo(cardX+padX+tw, oldY-11);
    ctx.stroke();
    ctx.restore();
  }

  // ---------- Altın alt bar (kartla kaynaşmış) ----------
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

  // ÖZEL FİYAT etiketi
  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(40,25,0,0.62)";
  ctx.font = "700 19px Arial";
  ctx.fillText("ÖZEL FİYAT", cardX+padX, goldY+30);
  ctx.restore();

  // ---------- Yeni fiyat ----------
  const p = splitMoney(nw);
  let size = 84;
  ctx.font = "900 "+size+"px Impact, Arial Black, Arial";
  while(ctx.measureText(p.lira).width > cardW-220 && size>56) size -= 4;

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

  // ---------- İndirim rozeti (kenardan taşan, eğik) ----------
  if(disc>0){
    const bw = 138, bh = 72;
    const bx = cardX + cardW - 38;
    const by = goldY - 4;

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(-7*Math.PI/180);

    ctx.shadowColor = "rgba(180,0,0,0.55)";
    ctx.shadowBlur = 16;

    roundRectCorners(ctx, -bw/2, -bh/2, bw, bh, {tl:14,tr:14,br:14,bl:14});
    const rg = ctx.createLinearGradient(-bw/2,-bh/2,bw/2,bh/2);
    rg.addColorStop(0, "#B80000");
    rg.addColorStop(1, "#FF2A00");
    ctx.fillStyle = rg;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,180,180,0.55)";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 28px Arial Black, Arial";
    ctx.fillText("%"+disc, 0, -2);

    ctx.fillStyle = "#FFE3E3";
    ctx.font = "700 17px Arial";
    ctx.fillText("İNDİRİM", 0, 22);

    ctx.restore();
  }
}
