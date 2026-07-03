import {C,upperTR,wrapLines} from "./utils.js";

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
  ctx.moveTo(x,y+42);
  ctx.quadraticCurveTo(x+32,y+8,x+66,y+42);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x,y+42);
  ctx.quadraticCurveTo(x+16,y-10,x+42,y+4);
  ctx.stroke();

  ctx.restore();
}

export function drawProductInfo(ctx,deal){
  const parsed=parseTitle(deal.title);

  ctx.textAlign="left";

  // Kategori
  ctx.fillStyle=C.gold;
  ctx.font="900 30px Arial Black, Arial";
  ctx.fillText(categoryLabel(deal.category),55,250);

  // Ürün adı
  const titleMaxWidth=430;
  let titleSize=92;
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

    if(ok){
      break;
    }

    titleSize-=4;
  }

  ctx.fillStyle=C.white;
  ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

  ctx.shadowColor="rgba(0,0,0,0.95)";
  ctx.shadowBlur=14;

  let y=340;

  for(let i=0;i<lines.length;i++){
    ctx.fillText(lines[i],55,y);
    y+=titleSize+8;
  }

  ctx.shadowBlur=0;

  // Birim
  const unitY=y+25;

  if(parsed.unit){
    ctx.fillStyle=C.gold;
    ctx.font="900 78px Impact, Arial Black, Arial";
    ctx.fillText(parsed.unit,55,unitY);

    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(55,unitY+38);
    ctx.lineTo(190,unitY+38);
    ctx.stroke();
  }else{
    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(55,unitY+10);
    ctx.lineTo(190,unitY+10);
    ctx.stroke();
  }

  // Slogan
  const slogans=sloganFor(deal.category);

  const sloganY=620;

  drawLeaf(ctx,55,sloganY-35);

  ctx.fillStyle=C.white;
  ctx.font="900 28px Arial Black, Arial";
  ctx.fillText(slogans[0],115,sloganY);
  ctx.fillText(slogans[1],115,sloganY+36);
  ctx.fillText(slogans[2],115,sloganY+72);
}
