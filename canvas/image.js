import {cover} from "./utils.js";

export function drawProductImage(ctx,productImg){
  if(!productImg)return;

  // Ürün bölgesi artık kutu değil, afişin içine yayılıyor
  const x=260;
  const y=165;
  const w=820;
  const h=700;

  // Ürün arkasına ışık
  const glow=ctx.createRadialGradient(760,520,80,760,520,520);
  glow.addColorStop(0,"rgba(255,212,0,0.16)");
  glow.addColorStop(0.45,"rgba(255,140,0,0.08)");
  glow.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=glow;
  ctx.fillRect(180,120,900,780);

  // Ana ürün fotoğrafı
  ctx.save();
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.clip();

  ctx.filter="saturate(1.12) contrast(1.08)";
  cover(ctx,productImg,x,y,w,h,0.58,0.52);
  ctx.filter="none";

  ctx.restore();

  // Sol tarafa geçiş, panel değil fade
  const leftFade=ctx.createLinearGradient(240,0,540,0);
  leftFade.addColorStop(0,"rgba(0,0,0,1)");
  leftFade.addColorStop(0.55,"rgba(0,0,0,0.72)");
  leftFade.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=leftFade;
  ctx.fillRect(220,145,360,745);

  // Üstten yumuşak karartma
  const topFade=ctx.createLinearGradient(0,y,0,y+150);
  topFade.addColorStop(0,"rgba(0,0,0,0.75)");
  topFade.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=topFade;
  ctx.fillRect(x,y,w,160);

  // Alttan yumuşak karartma
  const bottomFade=ctx.createLinearGradient(0,y+h-230,0,y+h);
  bottomFade.addColorStop(0,"rgba(0,0,0,0)");
  bottomFade.addColorStop(1,"rgba(0,0,0,0.88)");
  ctx.fillStyle=bottomFade;
  ctx.fillRect(x,y+h-240,w,240);

  // Sağ alt gölge, ürünü zemine oturtur
  const shadow=ctx.createRadialGradient(760,810,20,760,810,360);
  shadow.addColorStop(0,"rgba(0,0,0,0.65)");
  shadow.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=shadow;
  ctx.fillRect(380,650,700,260);
}
