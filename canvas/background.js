import {C,drawNoise} from "./utils.js";

export function drawBackground(ctx){
  ctx.fillStyle=C.black;
  ctx.fillRect(0,0,1080,1080);

  const glow=ctx.createRadialGradient(540,680,120,540,680,700);
  glow.addColorStop(0,"rgba(255,212,0,0.10)");
  glow.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=glow;
  ctx.fillRect(0,0,1080,1080);

  drawNoise(ctx,1080,1080,0.025);
}
