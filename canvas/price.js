import {C,money,splitMoney,rr} from "./utils.js";

function drawPriceTag(ctx,x,y,w,h){
  ctx.save();

  ctx.shadowColor="rgba(255,212,0,0.28)";
  ctx.shadowBlur=18;
  ctx.shadowOffsetY=8;

  ctx.fillStyle=C.gold;

  ctx.beginPath();
  ctx.moveTo(x+24,y);
  ctx.lineTo(x+w-46,y);
  ctx.lineTo(x+w,y+h/2);
  ctx.lineTo(x+w-46,y+h);
  ctx.lineTo(x+24,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-24);
  ctx.lineTo(x,y+24);
  ctx.quadraticCurveTo(x,y,x+24,y);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="600 32px Arial";
  ctx.fillStyle="rgba(255,255,255,0.65)";
  ctx.fillText(txt,x,y);

  const w=ctx.measureText(txt).width;

  ctx.strokeStyle=C.gold;
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(x,y-11);
  ctx.lineTo(x+w,y-11);
  ctx.stroke();
}

function drawNewPrice(ctx,x,y,price,maxWidth){
  const p=splitMoney(price);

  let size=104;

  while(size>66){
    ctx.font="800 "+size+"px Arial";
    const w1=ctx.measureText(p.lira).width;

    ctx.font="800 "+Math.round(size*0.5)+"px Arial";
    const w2=ctx.measureText(","+p.kurus).width;

    ctx.font="700 "+Math.round(size*0.42)+"px Arial";
    const w3=ctx.measureText("₺").width;

    if(w1+w2+w3+50<=maxWidth)break;

    size-=4;
  }

  ctx.textAlign="left";
  ctx.fillStyle="#141414";

  ctx.font="800 "+size+"px Arial";
  ctx.fillText(p.lira,x,y);

  const w1=ctx.measureText(p.lira).width;

  ctx.font="800 "+Math.round(size*0.5)+"px Arial";
  ctx.fillText(","+p.kurus,x+w1+10,y-4);

  const w2=ctx.measureText(","+p.kurus).width;

  ctx.font="700 "+Math.round(size*0.42)+"px Arial";
  ctx.fillText("₺",x+w1+w2+26,y-4);
}

export function drawPriceBlock(ctx,deal){
  drawOldPrice(ctx,65,810,deal.old_price);

  drawPriceTag(ctx,48,835,600,140);

  drawNewPrice(ctx,82,935,deal.new_price,520);

  const old=Number(deal.old_price||0);
  const nw=Number(deal.new_price||0);
  const disc=old>0?Math.max(0,Math.round(((old-nw)/old)*100)):0;

  if(disc>0){
    ctx.save();

    rr(ctx,840,842,175,112,28);
    ctx.fillStyle="rgba(0,0,0,0.62)";
    ctx.fill();

    ctx.strokeStyle="rgba(255,212,0,0.45)";
    ctx.lineWidth=2;
    ctx.stroke();

    ctx.textAlign="center";
    ctx.fillStyle=C.gold;
    ctx.font="900 42px Arial Black, Arial";
    ctx.fillText("-%"+disc,928,895);

    ctx.fillStyle=C.white;
    ctx.font="bold 21px Arial";
    ctx.fillText("İNDİRİM",928,925);

    ctx.restore();
  }
}
