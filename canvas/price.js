import {C,money,splitMoney,rr} from "./utils.js";

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="bold 31px Arial";
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

function drawPriceCard(ctx,x,y,w,h){
  ctx.save();

  ctx.shadowColor="rgba(255,212,0,0.22)";
  ctx.shadowBlur=24;
  ctx.shadowOffsetY=10;

  rr(ctx,x,y,w,h,32);

  const grad=ctx.createLinearGradient(0,y,0,y+h);
  grad.addColorStop(0,"rgba(35,35,35,0.95)");
  grad.addColorStop(0.48,"rgba(7,7,7,0.92)");
  grad.addColorStop(1,"rgba(0,0,0,0.98)");

  ctx.fillStyle=grad;
  ctx.fill();

  ctx.strokeStyle="rgba(255,212,0,0.78)";
  ctx.lineWidth=2.2;
  ctx.stroke();

  ctx.restore();

  // İç altın parlama
  ctx.save();
  ctx.globalAlpha=0.24;
  ctx.strokeStyle=C.gold;
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(x+35,y+18);
  ctx.lineTo(x+w-35,y+18);
  ctx.stroke();
  ctx.restore();
}

function drawNewPrice(ctx,x,y,price,maxWidth){
  const p=splitMoney(price);

  let size=104;

  while(size>68){
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

  // Hafif glow
  ctx.shadowColor="rgba(255,212,0,0.35)";
  ctx.shadowBlur=12;

  ctx.fillStyle=C.gold;

  ctx.font="bold "+size+"px Arial";
  ctx.fillText(p.lira,x,y);

  const w1=ctx.measureText(p.lira).width;

  ctx.font="bold "+Math.round(size*0.52)+"px Arial";
  ctx.fillText(","+p.kurus,x+w1+12,y-5);

  const w2=ctx.measureText(","+p.kurus).width;

  ctx.font="bold "+Math.round(size*0.46)+"px Arial";
  ctx.fillText("₺",x+w1+w2+30,y-5);

  ctx.shadowBlur=0;
}

function drawDiscountBadge(ctx,disc){
  if(disc<=0)return;

  const cx=930;
  const cy=235;
  const r=68;

  ctx.save();

  ctx.shadowColor="rgba(255,107,0,0.55)";
  ctx.shadowBlur=22;

  ctx.beginPath();
  ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.fillStyle="rgba(0,0,0,0.82)";
  ctx.fill();

  ctx.strokeStyle="#FF7A00";
  ctx.lineWidth=5;
  ctx.stroke();

  ctx.shadowBlur=0;

  ctx.textAlign="center";
  ctx.fillStyle="#FFFFFF";
  ctx.font="800 38px Arial Black, Arial";
  ctx.fillText("-%"+disc,cx,cy-4);

  ctx.fillStyle=C.gold;
  ctx.font="bold 18px Arial";
  ctx.fillText("İNDİRİM",cx,cy+26);

  ctx.restore();
}

export function drawPriceBlock(ctx,deal){
  const old=Number(deal.old_price||0);
  const nw=Number(deal.new_price||0);
  const disc=old>0?Math.max(0,Math.round(((old-nw)/old)*100)):0;

  // İndirim rozeti üst sağa alındı
  drawDiscountBadge(ctx,disc);

  // Eski fiyat
  drawOldPrice(ctx,64,812,deal.old_price);

  // Premium fiyat kartı
  drawPriceCard(ctx,48,835,590,150);

  // Küçük başlık
  ctx.textAlign="left";
  ctx.fillStyle=C.gold;
  ctx.font="700 22px Arial";
  ctx.fillText("ÖZEL FİYAT",82,875);

  // Yeni fiyat
  drawNewPrice(ctx,82,950,deal.new_price,500);
}
