export const C={
  black:"#030303",
  dark:"#070707",
  gold:"#FFD400",
  gold2:"#F5B400",
  white:"#FFFFFF",
  muted:"rgba(255,255,255,0.72)"
};

export function upperTR(s){
  return String(s||"").toLocaleUpperCase("tr-TR");
}

export function money(n){
  return Number(n||0).toLocaleString("tr-TR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  })+" ₺";
}

export function splitMoney(n){
  const s=Number(n||0).toLocaleString("tr-TR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  });
  const p=s.split(",");
  return {lira:p[0],kurus:p[1]||"00"};
}

const MONTHS=[
  "OCAK","ŞUBAT","MART","NİSAN","MAYIS","HAZİRAN",
  "TEMMUZ","AĞUSTOS","EYLÜL","EKİM","KASIM","ARALIK"
];

export function dateRangeTR(a,b){
  if(!a||!b)return "TARİH YOK";

  const makeDate=s=>new Date(String(s).split("T")[0]+"T12:00:00");

  const d1=makeDate(a);
  const d2=makeDate(b);

  const sd=String(d1.getDate()).padStart(2,"0");
  const ed=String(d2.getDate()).padStart(2,"0");

  const m1=MONTHS[d1.getMonth()];
  const m2=MONTHS[d2.getMonth()];
  const y=d1.getFullYear();

  if(d1.getMonth()===d2.getMonth()){
    return sd+"-"+ed+" "+m1+" "+y;
  }

  return sd+" "+m1+" - "+ed+" "+m2+" "+y;
}

export function cleanUrl(url){
  let u=String(url||"");

  if(u.indexOf("data:")===0)return u;
  if(u.indexOf("blob:")===0)return u;

  if(u.indexOf("https://")===0)u=u.substring(8);
  if(u.indexOf("http://")===0)u=u.substring(7);

  return u;
}

export function proxy(url,opt={}){
  if(!url)return "";

  if(String(url).indexOf("data:")===0)return url;

  const w=opt.w||1200;
  const h=opt.h||1200;
  const fit=opt.fit||"cover";
  const output=opt.output||"jpg";
  const q=opt.q||95;

  return "https://images.weserv.nl/?url="+encodeURIComponent(cleanUrl(url))+
    "&w="+w+
    "&h="+h+
    "&fit="+fit+
    "&output="+output+
    "&q="+q;
}

export function loadImage(src){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.crossOrigin="anonymous";

    img.onload=()=>resolve(img);
    img.onerror=()=>reject(new Error("Görsel yüklenemedi"));

    img.src=src;
  });
}

export async function loadProxyImage(url,opt){
  return await loadImage(proxy(url,opt));
}

export function rr(ctx,x,y,w,h,r){
  ctx.beginPath();

  if(ctx.roundRect){
    ctx.roundRect(x,y,w,h,r);
    return;
  }

  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);
  ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);
  ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);
  ctx.quadraticCurveTo(x,y,x+r,y);
}

export function cover(ctx,img,x,y,w,h,px=0.5,py=0.5){
  const scale=Math.max(w/img.width,h/img.height);
  const sw=img.width*scale;
  const sh=img.height*scale;

  ctx.drawImage(
    img,
    x+(w-sw)*px,
    y+(h-sh)*py,
    sw,
    sh
  );
}

export function contain(ctx,img,x,y,w,h){
  const scale=Math.min(w/img.width,h/img.height);
  const sw=img.width*scale;
  const sh=img.height*scale;
  const dx=x+(w-sw)/2;
  const dy=y+(h-sh)/2;

  ctx.drawImage(img,dx,dy,sw,sh);

  return {x:dx,y:dy,w:sw,h:sh};
}

export function fitFont(ctx,text,maxWidth,startSize,minSize,fontFamily){
  let size=startSize;

  while(size>=minSize){
    ctx.font="900 "+size+"px "+fontFamily;

    if(ctx.measureText(text).width<=maxWidth){
      return size;
    }

    size-=2;
  }

  return minSize;
}

export function wrapLines(ctx,text,maxWidth,fontSize,fontFamily,maxLines){
  ctx.font="900 "+fontSize+"px "+fontFamily;

  const words=String(text||"").split(" ");
  const lines=[];
  let line="";

  for(let i=0;i<words.length;i++){
    const test=line+words[i]+" ";

    if(ctx.measureText(test).width>maxWidth&&line){
      lines.push(line.trim());
      line=words[i]+" ";
    }else{
      line=test;
    }
  }

  if(line)lines.push(line.trim());

  return lines.slice(0,maxLines);
}

export function drawNoise(ctx,w,h,opacity=0.035){
  ctx.save();
  ctx.globalAlpha=opacity;

  for(let i=0;i<4200;i++){
    const x=Math.random()*w;
    const y=Math.random()*h;
    const a=Math.random();

    ctx.fillStyle=a>0.5?"#FFFFFF":"#000000";
    ctx.fillRect(x,y,1,1);
  }

  ctx.restore();
}
