import {loadProxyImage,dateRangeTR,C} from "./utils.js";
import {drawBackground} from "./background.js";
import {drawLogo} from "./logo.js";
import {drawProductImage} from "./image.js";
import {drawProductInfo} from "./typography.js";
import {drawPriceBlock} from "./price.js";

function drawDatePill(ctx,text){
  let size=20;
  ctx.font="700 "+size+"px Arial";
  let w=ctx.measureText(text).width;

  while(w>860&&size>13){
    size-=1;
    ctx.font="700 "+size+"px Arial";
    w=ctx.measureText(text).width;
  }

  const pillW=w+64;
  const pillH=44;
  const cx=540;
  const cy=1032;

  ctx.save();
  ctx.strokeStyle="rgba(255,212,0,0.55)";
  ctx.lineWidth=1.4;
  ctx.beginPath();
  ctx.ellipse(cx,cy,pillW/2,pillH/2,0,0,Math.PI*2);
  ctx.stroke();
  ctx.restore();

  ctx.textAlign="center";
  ctx.fillStyle=C.gold;
  ctx.font="700 "+size+"px Arial";
  ctx.fillText(text,cx,cy+size*0.32);
}

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

  const dateText=dateRangeTR(deal.start_date,deal.end_date)+" TARİHLERİ ARASINDA GEÇERLİDİR";
  drawDatePill(ctx,dateText);

  return canvas;
}
