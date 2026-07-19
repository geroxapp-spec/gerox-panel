import {C,money,splitMoney} from "./utils.js";

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="600 26px Arial";
  ctx.fillStyle="rgba(255,255,255,0.55)";
  ctx.fillText(txt,x,y);

  const w=ctx.measureText(txt).width;

  ctx.strokeStyle="rgba(255,255,255,0.55)";
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(x,y-9);
  ctx.lineTo(x+w,y-9);
  ctx.stroke();
}

function drawNewPrice(ctx,x,y,price,maxWidth){
  const p=splitMoney(price);

  let size=96;

  while(size>56){
    ctx.font="900 "+size+"px Arial Black, Arial";
    const w1=ctx.measureText(p.lira).width;

    ctx.font="800 "+Math.round(size*0.46)+"px Arial";
    const w2=ctx.measureText(","+p.kurus).width;

    ctx.font="700 "+Math.round(size*0.4)+"px Arial";
    const w3=ctx.measureText("₺").width;

    if(w1+w2+w3+40<=maxWidth)break;

    size-=4;
  }

  ctx.textAlign="left";
  ctx.fillStyle=C.gold;

  ctx.font="900 "+size+"px Arial Black, Arial";
  ctx.fillText(p.lira,x,y);

  const w1=ctx.measureText(p.lira).width;

  ctx.font="800 "+Math.round(size*0.46)+"px Arial";
  ctx.fillText(","+p.kurus,x+w1+8,y-4);

  const w2=ctx.measureText(","+p.kurus).width;

  ctx.font="700 "+Math.round(size*0.4)+"px Arial";
  ctx.fillText("₺",x+w1+w2+22,y-4);
}

export function drawPriceBlock(ctx,deal){
  const x=660;

  ctx.textAlign="left";
  ctx.fillStyle=C.gold;
  ctx.font="800 20px Arial";
  ctx.fillText("KAMPANYALI FİYAT",x,700);

  drawOldPrice(ctx,x,745,deal.old_price);
  drawNewPrice(ctx,x,860,deal.new_price,360);
}
