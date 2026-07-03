import {C,money,splitMoney,rr} from "./utils.js";

function drawBrush(ctx,x,y,w,h){
  ctx.save();

  ctx.shadowColor="rgba(255,212,0,0.38)";
  ctx.shadowBlur=26;
  ctx.shadowOffsetY=10;

  const grad=ctx.createLinearGradient(0,y,0,y+h);
  grad.addColorStop(0,"#FFE96A");
  grad.addColorStop(0.45,"#FFD400");
  grad.addColorStop(1,"#D6AA00");

  ctx.fillStyle=grad;

  ctx.beginPath();
  ctx.moveTo(x+28,y);
  ctx.lineTo(x+w-46,y+4);
  ctx.lineTo(x+w,y+30);
  ctx.lineTo(x+w-18,y+62);
  ctx.lineTo(x+w,y+96);
  ctx.lineTo(x+w-38,y+h);
  ctx.lineTo(x+30,y+h);
  ctx.lineTo(x,y+h-28);
  ctx.lineTo(x+16,y+h-64);
  ctx.lineTo(x,y+28);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Brush dokusu
  ctx.save();
  ctx.fillStyle="rgba(0,0,0,0.16)";

  for(let i=0;i<12;i++){
    const yy=y+12+i*9;

    ctx.fillRect(x+12,yy,54+(i%3)*13,4);
    ctx.fillRect(x+w-96,yy,66+(i%2)*18,4);
  }

  ctx.restore();

  // Üst parlama
  ctx.save();
  ctx.globalAlpha=0.35;
  ctx.fillStyle="#FFFFFF";
  ctx.fillRect(x+60,y+10,w-135,3);
  ctx.restore();
}

function drawOldPrice(ctx,x,y,oldPrice){
  const txt=money(oldPrice);

  ctx.textAlign="left";
  ctx.font="bold 34px Arial";
  ctx.fillStyle="rgba(255,255,255,0.78)";
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

  let size=124;

  while(size>74){
    ctx.font="900 "+size+"px Impact, Arial Black, Arial";
    const w1=ctx.measureText(p.lira).width;

    ctx.font="900 "+Math.round(size*0.52)+"px Impact, Arial Black, Arial";
    const w2=ctx.measureText(","+p.kurus).width;

    ctx.font="900 "+Math.round(size*0.46)+"px Arial Black, Arial";
    const w3=ctx.measureText("₺").width;

    if(w1+w2+w3+62<=maxWidth){
      break;
    }

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
  // Eski fiyat
  drawOldPrice(ctx,62,820,deal.old_price);

  // Sarı fiyat bandı
  drawBrush(ctx,42,842,620,148);

  // Yeni fiyat
  drawNewPrice(ctx,78,962,deal.new_price,540);

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

    ctx.shadowColor="rgba(255,212,0,0.25)";
    ctx.shadowBlur=12;

    ctx.textAlign="center";
    ctx.fillStyle=C.gold;
    ctx.font="900 40px Arial Black, Arial";
    ctx.fillText("-%"+disc,928,910);

    ctx.shadowBlur=0;

    ctx.fillStyle=C.white;
    ctx.font="bold 21px Arial";
    ctx.fillText("İNDİRİM",928,938);

    ctx.restore();
  }
}
