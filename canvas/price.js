import {C,money,splitMoney,rr} from "./utils.js";

function drawBrush(ctx,x,y,w,h){
  ctx.save();

  ctx.shadowColor="rgba(255,212,0,0.32)";
  ctx.shadowBlur=22;
  ctx.shadowOffsetY=10;

  ctx.fillStyle=C.gold;

  ctx.beginPath();
  ctx.moveTo(x+26,y);
  ctx.lineTo(x+w-42,y+4);
  ctx.lineTo(x+w,y+30);
  ctx.lineTo(x+w-16,y+62);
  ctx.lineTo(x+w,y+96);
  ctx.lineTo(x+w-36,y+h);
  ctx.lineTo(x+28,y+h);
  ctx.lineTo(x,y+h-25);
  ctx.lineTo(x+14,y+h-62);
  ctx.lineTo(x,y+26);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  ctx.save();
  ctx.fillStyle="rgba(0,0,0,0.14)";

  for(let i=0;i<12;i++){
    const yy=y+12+i*10;

    ctx.fillRect(x+12,yy,54+(i%3)*13,4);
    ctx.fillRect(x+w-92,yy,62+(i%2)*17,4);
  }

  ctx.restore();
}

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="bold 34px Arial";
  ctx.fillStyle="rgba(255,255,255,0.76)";
  ctx.fillText(txt,x,y);

  const w=ctx.measureText(txt).width;

  ctx.strokeStyle=C.gold;
  ctx.lineWidth=5;
  ctx.beginPath();
  ctx.moveTo(x,y-12);
  ctx.lineTo(x+w,y-12);
  ctx.stroke();
}

function drawNewPrice(ctx,x,y,price,maxWidth){
  const p=splitMoney(price);

  let size=126;

  while(size>78){
    ctx.font="900 "+size+"px Impact, Arial Black, Arial";
    const w1=ctx.measureText(p.lira).width;

    ctx.font="900 "+Math.round(size*0.52)+"px Impact, Arial Black, Arial";
    const w2=ctx.measureText(","+p.kurus).width;

    ctx.font="900 "+Math.round(size*0.46)+"px Arial Black, Arial";
    const w3=ctx.measureText("₺").width;

    if(w1+w2+w3+60<=maxWidth)break;

    size-=4;
  }

  ctx.textAlign="left";
  ctx.fillStyle="#000000";

  ctx.font="900 "+size+"px Impact, Arial Black, Arial";
  ctx.fillText(p.lira,x,y);

  const w1=ctx.measureText(p.lira).width;

  ctx.font="900 "+Math.round(size*0.52)+"px Impact, Arial Black, Arial";
  ctx.fillText(","+p.kurus,x+w1+12,y-5);

  const w2=ctx.measureText(","+p.kurus).width;

  ctx.font="900 "+Math.round(size*0.46)+"px Arial Black, Arial";
  ctx.fillText("₺",x+w1+w2+30,y-5);
}

export function drawPriceBlock(ctx,deal){
  drawOldPrice(ctx,65,820,deal.old_price);

  drawBrush(ctx,48,842,650,150);

  drawNewPrice(ctx,82,962,deal.new_price,570);

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
