export function drawProductImage(ctx, productImg){
  if(!productImg) return;

  const W=1080;

  const imgW=productImg.naturalWidth||productImg.width||800;
  const imgH=productImg.naturalHeight||productImg.height||800;

  // Sağ taraf alanı
  const areaX=460;
  const areaY=120;
  const areaW=590;
  const areaH=720;

  const ratio=Math.min(areaW/imgW, areaH/imgH);
  const drawW=imgW*ratio;
  const drawH=imgH*ratio;
  const drawX=areaX+(areaW-drawW)/2;
  const drawY=areaY+(areaH-drawH)/2;
  const cx=drawX+drawW/2;
  const cy=drawY+drawH/2;

  // Ürün arkası büyük altın halka
  ctx.save();
  const ring=ctx.createRadialGradient(cx,cy-30,drawW*0.28,cx,cy-30,drawW*0.62);
  ring.addColorStop(0,"rgba(0,0,0,0)");
  ring.addColorStop(0.72,"rgba(255,200,30,0.0)");
  ring.addColorStop(0.82,"rgba(255,200,30,0.55)");
  ring.addColorStop(0.90,"rgba(255,160,0,0.30)");
  ring.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=ring;
  ctx.beginPath();
  ctx.ellipse(cx,cy-30,drawW*0.62,drawW*0.62,0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Ürün arkası sıcak glow
  ctx.save();
  const glow=ctx.createRadialGradient(cx,cy,20,cx,cy,drawW*0.75);
  glow.addColorStop(0,"rgba(255,180,20,0.18)");
  glow.addColorStop(0.5,"rgba(200,80,0,0.10)");
  glow.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=glow;
  ctx.fillRect(areaX-60,areaY-60,areaW+120,areaH+120);
  ctx.restore();

  // Zemin gölgesi
  ctx.save();
  const shadow=ctx.createRadialGradient(cx,drawY+drawH,10,cx,drawY+drawH+10,drawW*0.45);
  shadow.addColorStop(0,"rgba(0,0,0,0.80)");
  shadow.addColorStop(0.5,"rgba(0,0,0,0.40)");
  shadow.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=shadow;
  ctx.beginPath();
  ctx.ellipse(cx,drawY+drawH+8,drawW*0.42,28,0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Ürün
  ctx.save();
  ctx.filter="saturate(1.25) contrast(1.12) drop-shadow(0 16px 40px rgba(0,0,0,0.75))";
  ctx.drawImage(productImg,drawX,drawY,drawW,drawH);
  ctx.filter="none";
  ctx.restore();
}
