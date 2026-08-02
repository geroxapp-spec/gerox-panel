export function drawBackground(ctx, productImg){
  const W=1080, H=1080;

  // Koyu zemin
  const base=ctx.createRadialGradient(540,540,0,540,540,900);
  base.addColorStop(0,"#1a1200");
  base.addColorStop(0.5,"#0d0900");
  base.addColorStop(1,"#000000");
  ctx.fillStyle=base;
  ctx.fillRect(0,0,W,H);

  // Sağ taraf dramatik altın ışık (ürün arkası)
  const rightLight=ctx.createRadialGradient(820,420,0,820,420,580);
  rightLight.addColorStop(0,"rgba(255,200,40,0.22)");
  rightLight.addColorStop(0.3,"rgba(180,100,0,0.14)");
  rightLight.addColorStop(0.6,"rgba(80,40,0,0.08)");
  rightLight.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=rightLight;
  ctx.fillRect(0,0,W,H);

  // Sol alt sıcak ışık
  const leftLight=ctx.createRadialGradient(180,820,0,180,820,400);
  leftLight.addColorStop(0,"rgba(255,180,0,0.10)");
  leftLight.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=leftLight;
  ctx.fillRect(0,0,W,H);

  // Altın parçacık doku
  drawGoldParticles(ctx,W,H);

  // Üst karartma (logo alanı)
  const topDark=ctx.createLinearGradient(0,0,0,180);
  topDark.addColorStop(0,"rgba(0,0,0,0.85)");
  topDark.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=topDark;
  ctx.fillRect(0,0,W,180);

  // Alt karartma (tarih alanı)
  const botDark=ctx.createLinearGradient(0,900,0,H);
  botDark.addColorStop(0,"rgba(0,0,0,0)");
  botDark.addColorStop(1,"rgba(0,0,0,0.90)");
  ctx.fillStyle=botDark;
  ctx.fillRect(0,900,W,180);
}

function drawGoldParticles(ctx,W,H){
  const rng=mulberry32(42);
  ctx.save();
  for(let i=0;i<320;i++){
    const x=rng()*W;
    const y=rng()*H;
    const r=rng()*1.8+0.3;
    const a=rng()*0.45+0.05;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,${180+Math.floor(rng()*60)},0,${a})`;
    ctx.fill();
  }
  ctx.restore();
}

function mulberry32(seed){
  let s=seed;
  return function(){
    s|=0; s=s+0x6D2B79F5|0;
    let t=Math.imul(s^s>>>15,1|s);
    t=t+Math.imul(t^t>>>7,61|t)^t;
    return ((t^t>>>14)>>>0)/4294967296;
  };
}
