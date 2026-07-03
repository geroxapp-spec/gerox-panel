import {C,upperTR,wrapLines,rr} from "./utils.js";

const CATEGORY_LABELS={
  manav:"MANAV",
  kasap:"KASAP",
  sut:"SÜT ÜRÜNLERİ",
  bakliyat:"BAKLİYAT",
  cay:"ÇAY & KAHVE",
  temizlik:"TEMİZLİK",
  kisisel:"KİŞİSEL BAKIM"
};

function categoryLabel(cat){
  return CATEGORY_LABELS[String(cat||"").toLowerCase()]||upperTR(cat||"FIRSAT");
}

function parseTitle(title){
  let t=String(title||"").trim();
  let unit="";

  const m=t.match(/\(([^)]+)\)/);

  if(m){
    unit=upperTR(m[1]);
    t=t.replace(m[0],"").trim();
  }else{
    const m2=t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|LİTRE|LITRE|ADET|PKT))$/i);

    if(m2){
      unit=upperTR(m2[1]);
      t=t.replace(m2[0],"").trim();
    }
  }

  return {
    name:upperTR(t),
    unit:unit
  };
}

function sloganFor(cat){
  const c=String(cat||"").toLowerCase();

  if(c.includes("manav"))return ["TAZE","DOĞAL","LEZZETLİ"];
  if(c.includes("kasap"))return ["GÜNLÜK","TAZE","KALİTELİ"];
  if(c.includes("sut")||c.includes("süt"))return ["KALİTELİ","LEZZETLİ","BEREKETLİ"];
  if(c.includes("bakliyat"))return ["KALİTELİ","LEZZETLİ","BEREKETLİ"];
  if(c.includes("temizlik"))return ["GÜÇLÜ","ETKİLİ","EKONOMİK"];
  if(c.includes("kisisel"))return ["GÜVENİLİR","KALİTELİ","UYGUN"];

  return ["FIRSAT","KALİTE","UYGUN FİYAT"];
}

function drawLeaf(ctx,x,y){
  ctx.save();

  ctx.strokeStyle=C.gold;
  ctx.lineWidth=5;
  ctx.lineCap="round";

  ctx.beginPath();
  ctx.moveTo(x,y+40);
  ctx.quadraticCurveTo(x+28,y+8,x+58,y+38);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x,y+40);
  ctx.quadraticCurveTo(x+14,y-8,x+38,y+4);
  ctx.stroke();

  ctx.restore();
}

export function drawProductInfo(ctx,deal){
  const panel={
    x:42,
    y:205,
    w:320,
    h:540
  };

  // Sol bilgi paneli
  ctx.save();

  rr(ctx,panel.x,panel.y,panel.w,panel.h,30);
  ctx.fillStyle="rgba(0,0,0,0.80)";
  ctx.fill();

  ctx.strokeStyle="rgba(255,212,0,0.22)";
  ctx.lineWidth=1.5;
  ctx.stroke();

  // Panel sol altın çizgi
  ctx.fillStyle="rgba(255,212,0,0.90)";
  ctx.fillRect(panel.x+1,panel.y+38,5,130);

  ctx.restore();

  ctx.textAlign="left";

  // Kategori
  ctx.fillStyle=C.gold;
  ctx.font="900 27px Arial Black, Arial";
  ctx.fillText(categoryLabel(deal.category),70,260);

  const parsed=parseTitle(deal.title);

  // Ürün adı
  const titleMaxWidth=275;
  let titleSize=86;
  let lines=[];

  while(titleSize>=56){
    lines=wrapLines(ctx,parsed.name,titleMaxWidth,titleSize,"Impact, Arial Black, Arial",3);

    ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

    let ok=true;

    for(let i=0;i<lines.length;i++){
      if(ctx.measureText(lines[i]).width>titleMaxWidth){
        ok=false;
      }
    }

    const totalHeight=lines.length*(titleSize+8);

    if(ok&&totalHeight<=225){
      break;
    }

    titleSize-=3;
  }

  ctx.fillStyle=C.white;
  ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

  ctx.shadowColor="rgba(0,0,0,0.90)";
  ctx.shadowBlur=12;

  let y=340;

  for(let i=0;i<lines.length;i++){
    ctx.fillText(lines[i],70,y);
    y+=titleSize+8;
  }

  ctx.shadowBlur=0;

  // Birim
  const unitY=Math.min(y+18,565);

  if(parsed.unit){
    ctx.fillStyle=C.gold;
    ctx.font="900 70px Impact, Arial Black, Arial";
    ctx.fillText(parsed.unit,70,unitY);

    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(70,unitY+35);
    ctx.lineTo(195,unitY+35);
    ctx.stroke();
  }else{
    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(70,unitY+20);
    ctx.lineTo(195,unitY+20);
    ctx.stroke();
  }

  // Slogan bölümü
  const slogans=sloganFor(deal.category);

  drawLeaf(ctx,72,618);

  ctx.fillStyle=C.white;
  ctx.font="900 28px Arial Black, Arial";
  ctx.fillText(slogans[0],125,640);
  ctx.fillText(slogans[1],125,675);
  ctx.fillText(slogans[2],125,710);
}
