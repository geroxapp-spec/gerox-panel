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

function drawHotBadge(ctx,x,y){
  ctx.save();

  const grad=ctx.createLinearGradient(x,y,x+250,y+54);
  grad.addColorStop(0,"#FF3B00");
  grad.addColorStop(1,"#FF8A00");

  rr(ctx,x,y,245,54,27);
  ctx.fillStyle=grad;
  ctx.fill();

  ctx.strokeStyle="rgba(255,212,0,0.72)";
  ctx.lineWidth=2;
  ctx.stroke();

  ctx.shadowColor="rgba(255,90,0,0.45)";
  ctx.shadowBlur=14;

  ctx.textAlign="center";
  ctx.fillStyle="#FFFFFF";
  ctx.font="800 25px Arial Black, Arial";
  ctx.fillText("SICAK FIRSAT",x+122,y+36);

  ctx.restore();
}

export function drawProductInfo(ctx,deal){
  const parsed=parseTitle(deal.title);

  ctx.textAlign="left";

  // Kategori
  ctx.fillStyle=C.gold;
  ctx.font="800 30px Arial Black, Arial";
  ctx.fillText(category,
  LAYOUT.title.x,
  LAYOUT.title.y);

  // Ürün adı
  const titleMaxWidth=430;
  let titleSize=94;
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

    if(ok)break;

    titleSize-=4;
  }

  ctx.fillStyle=C.white;
  ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

  ctx.shadowColor="rgba(0,0,0,0.95)";
  ctx.shadowBlur=14;

  let y=340;

  for(let i=0;i<lines.length;i++){
    ctx.strokeStyle="rgba(0,0,0,0.78)";
    ctx.lineWidth=5;
    ctx.strokeText(lines[i],55,y);

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

  // Slogan yerine daha güçlü rozet
  drawHotBadge(ctx,55,620);
}
