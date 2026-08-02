import {C, money, splitMoney, rr} from "./utils.js";

export function drawPriceBlock(ctx, deal){
  const old=Number(deal.old_price||0);
  const nw=Number(deal.new_price||0);
  const disc=old>0?Math.max(0,Math.round(((old-nw)/old)*100)):0;

  const cardX=28;
  const cardY=170;
  const cardW=490;

  // Eski fiyat üstü çizgili
  if(old>0){
    const txt=money(old);
    ctx.save();
    ctx.textAlign="left";
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.font="600 32px Arial";
    ctx.fillText(txt,cardX+32,cardY+cardW-10);
    const tw=ctx.measureText(txt).width;
    ctx.strokeStyle="rgba(255,80,80,0.90)";
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(cardX+32,cardY+cardW-24);
    ctx.lineTo(cardX+32+tw,cardY+cardW-24);
    ctx.stroke();
    ctx.restore();
  }

  // Altın fiyat kartı
  const priceCardX=cardX;
  const priceCardY=cardY+cardW+12;
  const priceCardW=cardW;
  const priceCardH=130;

  ctx.save();
  ctx.shadowColor="rgba(255,180,0,0.45)";
  ctx.shadowBlur=28;
  rr(ctx,priceCardX,priceCardY,priceCardW,priceCardH,22);

  const pg=ctx.createLinearGradient(priceCardX,priceCardY,priceCardX,priceCardY+priceCardH);
  pg.addColorStop(0,"#C8920A");
  pg.addColorStop(0.3,"#FFD700");
  pg.addColorStop(0.7,"#E6A800");
  pg.addColorStop(1,"#8B6200");
  ctx.fillStyle=pg;
  ctx.fill();

  ctx.strokeStyle="rgba(255,255,180,0.60)";
  ctx.lineWidth=2;
  ctx.stroke();
  ctx.restore();

  // Fiyat yazısı
  const p=splitMoney(nw);
  let size=96;
  ctx.font="900 "+size+"px Impact, Arial Black";
  while(ctx.measureText(p.lira).width>priceCardW-180 && size>60) size-=4;

  const fy=priceCardY+priceCardH-18;
  const fx=priceCardX+32;

  ctx.save();
  ctx.textAlign="left";
  ctx.shadowColor="rgba(0,0,0,0.55)";
  ctx.shadowBlur=8;

  // Lira
  ctx.fillStyle="#1a0f00";
  ctx.font="900 "+size+"px Impact, Arial Black, Arial";
  ctx.fillText(p.lira,fx,fy);
  const lw=ctx.measureText(p.lira).width;

  // Kuruş
  ctx.font="900 "+Math.round(size*0.48)+"px Impact, Arial Black, Arial";
  ctx.fillText(","+p.kurus,fx+lw+6,fy-8);
  const kw=ctx.measureText(","+p.kurus).width;

  // TL
  ctx.font="700 "+Math.round(size*0.42)+"px Arial";
  ctx.fillText("₺",fx+lw+kw+18,fy-8);
  ctx.restore();

  // İndirim rozeti (kırmızı, fiyat kartının sağ üstünde)
  if(disc>0){
    const bx=priceCardX+priceCardW-20;
    const by=priceCardY-20;
    const bw=148;
    const bh=80;

    ctx.save();
    ctx.shadowColor="rgba(200,0,0,0.55)";
    ctx.shadowBlur=18;
    rr(ctx,bx-bw,by,bw,bh,16);

    const rg=ctx.createLinearGradient(bx-bw,by,bx,by+bh);
    rg.addColorStop(0,"#cc0000");
    rg.addColorStop(1,"#ff2200");
    ctx.fillStyle=rg;
    ctx.fill();

    ctx.strokeStyle="rgba(255,150,150,0.50)";
    ctx.lineWidth=1.5;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.textAlign="center";
    const bcx=bx-bw/2;

    ctx.fillStyle="#FFFFFF";
    ctx.font="800 30px Arial Black, Arial";
    ctx.fillText("%"+disc,bcx,by+34);

    ctx.fillStyle="#FFE0E0";
    ctx.font="700 20px Arial";
    ctx.fillText("İNDİRİM",bcx,by+60);
    ctx.restore();
  }
}
