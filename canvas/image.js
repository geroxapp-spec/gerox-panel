import {cover,rr} from "./utils.js";

export function drawProductImage(ctx,productImg){
  if(!productImg)return;

  const x=330;
  const y=190;
  const w=705;
  const h=560;

  ctx.save();

  ctx.shadowColor="rgba(0,0,0,0.86)";
  ctx.shadowBlur=42;
  ctx.shadowOffsetY=22;

  rr(ctx,x,y,w,h,38);
  ctx.clip();

  cover(ctx,productImg,x,y,w,h,0.56,0.52);

  const leftFade=ctx.createLinearGradient(x,y,x+260,y);
  leftFade.addColorStop(0,"rgba(0,0,0,0.72)");
  leftFade.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=leftFade;
  ctx.fillRect(x,y,280,h);

  const bottomFade=ctx.createLinearGradient(0,y+h-180,0,y+h);
  bottomFade.addColorStop(0,"rgba(0,0,0,0)");
  bottomFade.addColorStop(1,"rgba(0,0,0,0.74)");
  ctx.fillStyle=bottomFade;
  ctx.fillRect(x,y+h-190,w,190);

  ctx.restore();

  const softBlend=ctx.createLinearGradient(260,0,520,0);
  softBlend.addColorStop(0,"rgba(0,0,0,0.90)");
  softBlend.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=softBlend;
  ctx.fillRect(250,180,300,590);
}
