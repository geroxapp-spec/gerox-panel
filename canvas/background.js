import {C,cover,drawNoise} from "./utils.js";

export function drawBackground(ctx,productImg){
  ctx.fillStyle="#030303";
  ctx.fillRect(0,0,1080,1080);

  // Ürün fotoğrafından bulanık arka plan
  if(productImg){
    ctx.save();
    ctx.globalAlpha=0.30;
    ctx.filter="blur(18px) saturate(1.2) contrast(1.1)";
    cover(ctx,productImg,-120,120,1320,820,0.55,0.5);
    ctx.restore();
    ctx.filter="none";
  }

  // Sağ tarafta sıcak sarı ışık
  const spot=ctx.createRadialGradient(820,460,40,820,460,650);
  spot.addColorStop(0,"rgba(255,212,0,0.24)");
  spot.addColorStop(0.35,"rgba(255,150,0,0.12)");
  spot.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=spot;
  ctx.fillRect(0,0,1080,1080);

  // Üst logo alanı
  const top=ctx.createLinearGradient(0,0,0,230);
  top.addColorStop(0,"rgba(0,0,0,1)");
  top.addColorStop(0.65,"rgba(0,0,0,0.85)");
  top.addColorStop(1,"rgba(0,0,0,0.25)");
  ctx.fillStyle=top;
  ctx.fillRect(0,0,1080,260);

  // Sol yazı alanı koyuluğu
  const left=ctx.createLinearGradient(0,0,720,0);
  left.addColorStop(0,"rgba(0,0,0,1)");
  left.addColorStop(0.48,"rgba(0,0,0,0.88)");
  left.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=left;
  ctx.fillRect(0,140,1080,760);

  // Alt fiyat alanı
  const bottom=ctx.createLinearGradient(0,650,0,1080);
  bottom.addColorStop(0,"rgba(0,0,0,0)");
  bottom.addColorStop(0.45,"rgba(0,0,0,0.82)");
  bottom.addColorStop(1,"rgba(0,0,0,1)");
  ctx.fillStyle=bottom;
  ctx.fillRect(0,600,1080,480);

  // Hafif vignette
  const vignette=ctx.createRadialGradient(540,520,260,540,520,820);
  vignette.addColorStop(0,"rgba(0,0,0,0)");
  vignette.addColorStop(1,"rgba(0,0,0,0.78)");
  ctx.fillStyle=vignette;
  ctx.fillRect(0,0,1080,1080);

  // Çok hafif noise
  drawNoise(ctx,1080,1080,0.025);
}
