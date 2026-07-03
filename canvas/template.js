import {loadProxyImage,dateRangeTR,C,rr} from "./utils.js";
import {drawBackground} from "./background.js";
import {drawLogo} from "./logo.js";
import {drawProductImage} from "./image.js";
import {drawProductInfo} from "./typography.js";
import {drawPriceBlock} from "./price.js";

export async function renderPoster({deal,business}){
  const canvas=document.createElement("canvas");
  canvas.width=1080;
  canvas.height=1080;

  const ctx=canvas.getContext("2d");

  let productImg=null;

  try{
    productImg=await loadProxyImage(deal.image_url,{
      w:1600,
      h:1200,
      fit:"cover",
      output:"jpg",
      q:96
    });
  }catch(e){
    productImg=null;
  }

  drawBackground(ctx,productImg);
  await drawLogo(ctx,business);
  drawProductImage(ctx,productImg);
  drawProductInfo(ctx,deal);
  drawPriceBlock(ctx,deal);

  // Tarih - daha ince, kapsül kutu içinde
  const dateText=dateRangeTR(deal.start_date,deal.end_date)+" TARİHLERİ ARASINDA GEÇERLİDİR";

  let fontSize=21;
  ctx.font="600 "+fontSize+"px Arial";

  while(ctx.measureText(dateText).width>830&&fontSize>16){
    fontSize-=1;
    ctx.font="600 "+fontSize+"px Arial";
  }

  const textW=ctx.measureText(dateText).width;
  const pillW=Math.min(920,textW+90);
  const pillH=46;
  const pillX=(1080-pillW)/2;
  const pillY=1012;

  ctx.save();

  // İnce üst çizgi
  ctx.strokeStyle="rgba(255,212,0,0.34)";
  ctx.lineWidth=1.5;
  ctx.beginPath();
  ctx.moveTo(120,995);
  ctx.lineTo(960,995);
  ctx.stroke();

  // Kapsül kutu
  rr(ctx,pillX,pillY,pillW,pillH,23);
  ctx.fillStyle="rgba(0,0,0,0.46)";
  ctx.fill();

  ctx.strokeStyle="rgba(255,212,0,0.62)";
  ctx.lineWidth=1.5;
  ctx.stroke();

  ctx.textAlign="center";
  ctx.fillStyle=C.gold;
  ctx.font="600 "+fontSize+"px Arial";
  ctx.fillText(dateText,540,pillY+30);

  ctx.restore();

  return canvas;
}
