import {C,loadProxyImage,contain,fitFont} from "./utils.js";

export async function drawLogo(ctx,business){
  const box={
    x:180,
    y:30,
    w:720,
    h:118
  };

  let drawn=false;

  if(business&&business.logo_url){
    try{
      const logo=await loadProxyImage(business.logo_url,{
        w:950,
        h:260,
        fit:"inside",
        output:"png",
        q:95
      });

      ctx.save();
      ctx.shadowColor="rgba(255,212,0,0.28)";
      ctx.shadowBlur=18;
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

    const size=fitFont(ctx,name,720,68,40,"Arial Black, Arial");
    ctx.font="900 "+size+"px Arial Black, Arial";
    ctx.fillText(name,540,105);
  }

  ctx.strokeStyle=C.gold;
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(310,168);
  ctx.lineTo(770,168);
  ctx.stroke();
}
