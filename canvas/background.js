import {cover,drawNoise} from "./utils.js";

export function drawBackground(ctx,productImg){
  ctx.fillStyle="#020202";
  ctx.fillRect(0,0,1080,1080);

  // Ürün görselinden bulanık atmosfer
  if(productImg){
    ctx.save();
    ctx.globalAlpha=0.36;
    ctx.filter="blur(18px) saturate(1.35) contrast(1.18)";
    cover(ctx,productImg,-140,120,1360,820,0.58,0.52);
    ctx.restore();
    ctx.filter="none";
  }

  // Sağ tarafta sıcak market ışığı
  const spot=ctx.createRadialGradient(820,470,30,820,470,680);
  spot.addColorStop(0,"rgba(255,214,0,0.30)");
  spot.addColorStop(0.35,"rgba(255,128,0,0.13)");
  spot.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=spot;
  ctx.fillRect(0,0,1080,1080);

  // Üst logo alanı
  const top=ctx.createLinearGradient(0,0,0,260);
  top.addColorStop(0,"rgba(0,0,0,1)");
  top.addColorStop(0.65,"rgba(0,0,0,0.92)");
  top.addColorStop(1,"rgba(0,0,0,0.30)");
  ctx.fillStyle=top;
  ctx.fillRect(0,0,1080,280);

  // Sol yazı alanı
  const left=ctx.createLinearGradient(0,0,720,0);
  left.addColorStop(0,"rgba(0,0,0,1)");
  left.addColorStop(0.52,"rgba(0,0,0,0.90)");
  left.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=left;
  ctx.fillRect(
    0,
    140,
    900,
    780
);

  // Alt fiyat zemini
  const bottom=ctx.createLinearGradient(0,620,0,1080);
  bottom.addColorStop(0,"rgba(0,0,0,0)");
  bottom.addColorStop(0.50,"rgba(0,0,0,0.84)");
  bottom.addColorStop(1,"rgba(0,0,0,1)");
  ctx.fillStyle=bottom;
  ctx.fillRect(0,580,1080,500);

  // Hafif sahne zemini
  const floor=ctx.createRadialGradient(520,885,40,520,885,620);
  floor.addColorStop(0,"rgba(255,184,0,0.12)");
  floor.addColorStop(0.45,"rgba(90,45,0,0.10)");
  floor.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=floor;
  ctx.fillRect(0,700,1080,380);

  // Vignette
  const vignette=ctx.createRadialGradient(540,520,260,540,520,830);
  vignette.addColorStop(0,"rgba(0,0,0,0)");
  vignette.addColorStop(1,"rgba(0,0,0,0.82)");
  ctx.fillStyle=vignette;
  ctx.fillRect(0,0,1080,1080);

  // Çok hafif doku
  drawNoise(ctx,1080,1080,0.024);
}
