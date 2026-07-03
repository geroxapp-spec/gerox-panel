import {cover,rr} from "./utils.js";

export function drawProductImage(ctx,productImg){
  if(!productImg)return;

  const x=315;
  const y=190;
  const w=720;
  const h=560;

  // Görsel arkasına yumuşak gölge / derinlik
  ctx.save();
  ctx.shadowColor="rgba(0,0,0,0.95)";
  ctx.shadowBlur=50;
  ctx.shadowOffsetY=24;

  rr(ctx,x,y,w,h,38);
  ctx.fillStyle="rgba(255,255,255,0.05)";
  ctx.fill();
  ctx.restore();

  // Ana ürün görseli
  ctx.save();
  rr(ctx,x,y,w,h,38);
  ctx.clip();

  cover(ctx,productImg,x,y,w,h,0.58,0.52);

  // Görselin solunu yazı paneliyle karıştırmak için koyulaştırma
  const leftFade=ctx.createLinearGradient(x,y,x+340,y);
  leftFade.addColorStop(0,"rgba(0,0,0,0.72)");
  leftFade.addColorStop(0.45,"rgba(0,0,0,0.38)");
  leftFade.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=leftFade;
  ctx.fillRect(x,y,360,h);

  // Alt koyulaştırma
  const bottomFade=ctx.createLinearGradient(0,y+h-210,0,y+h);
  bottomFade.addColorStop(0,"rgba(0,0,0,0)");
  bottomFade.addColorStop(1,"rgba(0,0,0,0.78)");
  ctx.fillStyle=bottomFade;
  ctx.fillRect(x,y+h-220,w,220);

  ctx.restore();

  // İnce premium kenarlık
  ctx.save();
  rr(ctx,x,y,w,h,38);
  ctx.strokeStyle="rgba(255,212,0,0.18)";
  ctx.lineWidth=1.4;
  ctx.stroke();
  ctx.restore();

  // Sol panel ile görsel arasını yumuşat
  const blend=ctx.createLinearGradient(260,0,470,0);
  blend.addColorStop(0,"rgba(0,0,0,0.95)");
  blend.addColorStop(0.65,"rgba(0,0,0,0.45)");
  blend.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=blend;
  ctx.fillRect(250,180,260,590);
}
