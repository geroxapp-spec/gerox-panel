import {C,cover} from "./utils.js";

export function drawProductImage(ctx,productImg){
  const w=1080,h=660;

  if(productImg){
    ctx.save();
    cover(ctx,productImg,0,0,w,h,0.5,0.42);
    ctx.restore();
  }

  const top=ctx.createLinearGradient(0,0,0,180);
  top.addColorStop(0,"rgba(0,0,0,0.55)");
  top.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=top;
  ctx.fillRect(0,0,1080,180);

  const bottom=ctx.createLinearGradient(0,h-260,0,h+10);
  bottom.addColorStop(0,"rgba(3,3,3,0)");
  bottom.addColorStop(1,"rgba(3,3,3,1)");
  ctx.fillStyle=bottom;
  ctx.fillRect(0,h-260,1080,270);
}

export function drawDiscountBurst(ctx,discPercent){
  if(!discPercent||discPercent<=0)return;

  const cx=930,cy=150,outerR=92,innerR=64,spikes=14,rotation=-0.15;

  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(rotation);

  ctx.shadowColor="rgba(0,0,0,0.5)";
  ctx.shadowBlur=18;
  ctx.shadowOffsetY=6;

  ctx.beginPath();
  for(let i=0;i<spikes*2;i++){
    const r=i%2===0?outerR:innerR;
    const angle=(Math.PI/spikes)*i;
    const px=Math.cos(angle)*r;
    const py=Math.sin(angle)*r;
    if(i===0){ctx.moveTo(px,py);}else{ctx.lineTo(px,py);}
  }
  ctx.closePath();

  ctx.fillStyle=C.gold;
  ctx.fill();

  ctx.restore();

  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(rotation*0.3);

  ctx.textAlign="center";
  ctx.fillStyle="#111111";
  ctx.font="900 40px Arial Black, Arial";
  ctx.fillText("%"+discPercent,0,-2);

  ctx.font="800 15px Arial";
  ctx.fillText("İNDİRİM",0,20);

  ctx.restore();
}
