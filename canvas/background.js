import {C,cover,drawNoise} from "./utils.js";

export function drawBackground(ctx,productImg){
  ctx.fillStyle=C.black;
  ctx.fillRect(0,0,1080,1080);

  if(productImg){
    ctx.save();
    ctx.globalAlpha=0.48;
    ctx.filter="blur(16px)";
    cover(ctx,productImg,-80,130,1240,820,0.5,0.5);
    ctx.restore();
    ctx.filter="none";
  }

  const spot=ctx.createRadialGradient(815,455,40,815,455,620);
  spot.addColorStop(0,"rgba(255,212,0,0.26)");
  spot.addColorStop(0.42,"rgba(255,168,0,0.12)");
  spot.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=spot;
  ctx.fillRect(0,0,1080,1080);

  const top=ctx.createLinearGradient(0,0,0,250);
  top.addColorStop(0,"rgba(0,0,0,1)");
  top.addColorStop(1,"rgba(0,0,0,0.25)");
  ctx.fillStyle=top;
  ctx.fillRect(0,0,1080,270);

  const left=ctx.createLinearGradient(0,0,760,0);
  left.addColorStop(0,"rgba(0,0,0,0.98)");
  left.addColorStop(0.52,"rgba(0,0,0,0.80)");
  left.addColorStop(1,"rgba(0,0,0,0.10)");
  ctx.fillStyle=left;
  ctx.fillRect(0,150,1080,780);

  const bottom=ctx.createLinearGradient(0,575,0,1080);
  bottom.addColorStop(0,"rgba(0,0,0,0)");
  bottom.addColorStop(0.55,"rgba(0,0,0,0.86)");
  bottom.addColorStop(1,"rgba(0,0,0,1)");
  ctx.fillStyle=bottom;
  ctx.fillRect(0,560,1080,520);

  const vignette=ctx.createRadialGradient(540,520,280,540,520,780);
  vignette.addColorStop(0,"rgba(0,0,0,0)");
  vignette.addColorStop(1,"rgba(0,0,0,0.74)");
  ctx.fillStyle=vignette;
  ctx.fillRect(0,0,1080,1080);

  drawNoise(ctx,1080,1080,0.028);
}
