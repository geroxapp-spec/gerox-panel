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

export function drawProductInfo(ctx,deal){
  const parsed=parseTitle(deal.title);

  ctx.textAlign="left";

  // Kategori
  ctx.fillStyle=C.gold;
  ctx.font="800 30px Arial Black, Arial";
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

    // Birimin altındaki kısa çizgi
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

  // Not:
  // Buradaki slogan yazıları özellikle kaldırıldı.
  // "TAZE / DOĞAL / LEZZETLİ" veya "KALİTELİ / LEZZETLİ / BEREKETLİ" artık görünmeyecek.
}
