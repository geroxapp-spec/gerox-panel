import {C,loadProxyImage,contain,fitFont} from "./utils.js";

export async function drawLogo(ctx,business){
  const box={x:290,y:34,w:500,h:88};

  ctx.save();
  ctx.fillStyle="rgba(0,0,0,0.45)";
  ctx.beginPath();
  ctx.roundRect(box.x-30,box.y-14,box.w+60,box.h+28,60);
  ctx.fill();
  ctx.restore();

  let drawn=false;

  if(business&&business.logo_url){
    try{
      const logo=await loadProxyImage(business.logo_url,{
        w:900,h:260,fit:"inside",output:"png",q:95
      });

      ctx.save();
      ctx.shadowColor="rgba(255,212,0,0.35)";
      ctx.shadowBlur=16;
      contain(ctx,logo,box.x,box.y,box.w,box.h);
      ctx.restore();

      drawn=true;
    }catch(e){
      drawn=false;
    }
  }

  if(!drawn){
    const name=((business&&business.name)?business.name:"MARKET").toLocaleUpperCase("tr-TR");
    ctx.textAlign="center";
    ctx.fillStyle=C.gold;
    const size=fitFont(ctx,name,box.w,52,32,"Arial Black, Arial");
    ctx.font="900 "+size+"px Arial Black, Arial";
    ctx.fillText(name,540,box.y+box.h/2+size*0.32);
  }
}
