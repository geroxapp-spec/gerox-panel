import {C,money,splitMoney,rr} from "./utils.js";

function drawPriceTag(ctx,x,y,w,h){
  ctx.save();

  // Daha sade, temiz fiyat etiketi
  ctx.shadowColor="rgba(255,212,0,0.22)";
  ctx.shadowBlur=18;
  ctx.shadowOffsetY=8;

  const grad=ctx.createLinearGradient(0,y,0,y+h);
  grad.addColorStop(0,"#FFE36A");
  grad.addColorStop(0.52,"#FFD400");
  grad.addColorStop(1,"#CFA900");

  ctx.fillStyle=grad;

  // Daha temiz, fırça gibi değil etiket gibi
  ctx.beginPath();
  ctx.moveTo(x+24,y);
  ctx.lineTo(x+w-42,y);
  ctx.lineTo(x+w,y+h/2);
  ctx.lineTo(x+w-42,y+h);
  ctx.lineTo(x+24,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-24);
  ctx.lineTo(x,y+24);
  ctx.quadraticCurveTo(x,y,x+24,y);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // İnce üst parlama
  ctx.save();
  ctx.globalAlpha=0.28;
  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(x+55,y+10,w-120,3);
  ctx.restore();

  // Çok ince koyu alt çizgi, etiketi oturtur
  ctx.save();
  ctx.globalAlpha=0.12;
  ctx.fillStyle="#000000";
  ctx.fillRect(x+40,y+h-8,w-105,4);
  ctx.restore();
}

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="bold 32px Arial";
  ctx.fillStyle="rgba(255,255,255,0.72)";
  ctx.fillText(txt,x,y);

  const w=ctx.measureText(txt).width;

  ctx.strokeStyle=C.gold;
  ctx.lineWidth=4;
  ctx.beginPath();
  ctx.moveTo(x,y-11);
  ctx.lineTo(x+w,y-11);
  ctx.stroke();
}

function drawNewPrice(ctx,x,y,price,maxWidth){
  const p=splitMoney(price);

  // Impact yerine Arial kullandık.
  // Daha az kalın, daha temiz durur.
  let size=106;

  while(size>70){
    ctx.font="bold "+size+"px Arial";
    const w1=ctx.measureText(p.lira).width;

    ctx.font="bold "+Math.round(size*0.52)+"px Arial";
    const w2=ctx.measureText(","+p.kurus).width;

    ctx.font="bold "+Math.round(size*0.46)+"px Arial";
    const w3=ctx.measureText("₺").width;

    if(w1+w2+w3+62<=maxWidth){
      break;
    }

    size-=4;
  }

  ctx.textAlign="left";
  ctx.fillStyle="#000000";

  ctx.font="bold "+size+"px Arial";
  ctx.fillText(p.lira,x,y);

  const w1=ctx.measureText(p.lira).width;

  ctx.font="bold "+Math.round(size*0.52)+"px Arial";
  ctx.fillText(","+p.kurus,x+w1+12,y-5);

  const w2=ctx.measureText(","+p.kurus).width;

  ctx.font="bold "+Math.round(size*0.46)+"px Arial";
  ctx.fillText("₺",x+w1+w2+30,y-5);
}

export function drawPriceBlock(ctx,deal){
  // Eski fiyat
  drawOldPrice(ctx,62,818,deal.old_price);

  // Yeni sade fiyat etiketi
  drawPriceTag(ctx,42,846,570,126);

  // Yeni fiyat, daha ince
  drawNewPrice(ctx,78,940,deal.new_price,490);

  const old=Number(deal.old_price||0);
  const nw=Number(deal.new_price||0);
  const disc=old>0?Math.max(0,Math.round(((old-nw)/old)*100)):0;

  if(disc>0){
    ctx.save();

    rr(ctx,840,858,176,106,26);
    ctx.fillStyle="rgba(0,0,0,0.72)";
    ctx.fill();

    ctx.strokeStyle="rgba(255,212,0,0.60)";
    ctx.lineWidth=2;
    ctx.stroke();

    ctx.shadowColor="rgba(255,212,0,0.22)";
    ctx.shadowBlur=10;

    ctx.textAlign="center";
    ctx.fillStyle=C.gold;
    ctx.font="800 38px Arial Black, Arial";
    ctx.fillText("-%"+disc,928,910);

    ctx.shadowBlur=0;

    ctx.fillStyle=C.white;
    ctx.font="600 21px Arial";
    ctx.fillText("İNDİRİM",928,938);

    ctx.restore();
  }
}
