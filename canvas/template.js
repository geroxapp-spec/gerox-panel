import {loadProxyImage,dateRangeTR,fitFont,C} from "./utils.js";
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

  const dateText=dateRangeTR(deal.start_date,deal.end_date)+" TARİHLERİ ARASINDA GEÇERLİDİR";

  ctx.textAlign="center";
  ctx.fillStyle=C.gold;

  const size=fitFont(ctx,dateText,940,25,18,"Arial Black, Arial");
  ctx.font="900 "+size+"px Arial Black, Arial";
  ctx.fillText(dateText,540,1048);

  return canvas;
}
