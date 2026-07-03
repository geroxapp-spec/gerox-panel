import {C,upperTR,fitFont,wrapLines,rr} from "./utils.js";

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
  const panel={
    x:42,
    y:205,
    w:505,
    h:300
  };

  ctx.save();
  rr(ctx,panel.x,panel.y,panel.w,panel.h,34);
  ctx.fillStyle="rgba(0,0,0,0.26)";
  ctx.fill();

  ctx.strokeStyle="rgba(255,212,0,0.12)";
  ctx.lineWidth=1.5;
  ctx.stroke();
  ctx.restore();

  ctx.textAlign="left";

  ctx.fillStyle=C.gold;
  ctx.font="900 28px Arial Black, Arial";
  ctx.fillText(categoryLabel(deal.category),70,260);

  const parsed=parseTitle(deal.title);

  let titleSize=92;
  let lines=[];

  while(titleSize>=58){
    lines=wrapLines(ctx,parsed.name,430,titleSize,"Impact, Arial Black, Arial",3);

    let ok=true;
    ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

    for(let i=0;i<lines.length;i++){
      if(ctx.measureText(lines[i]).width>430)ok=false;
    }

    if(ok)break;

    titleSize-=4;
  }

  ctx.fillStyle=C.white;
  ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";

  ctx.shadowColor="rgba(0,0,0,0.85)";
  ctx.shadowBlur=10;

  let y=340;

  for(let i=0;i<lines.length;i++){
    ctx.fillText(lines[i],70,y);
    y+=titleSize+8;
  }

  ctx.shadowBlur=0;

  if(parsed.unit){
    ctx.fillStyle=C.gold;
    ctx.font="900 72px Impact, Arial Black, Arial";
    ctx.fillText(parsed.unit,70,y+18);

    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(70,y+55);
    ctx.lineTo(205,y+55);
    ctx.stroke();
  }else{
    ctx.strokeStyle=C.gold;
    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.moveTo(70,y+20);
    ctx.lineTo(205,y+20);
    ctx.stroke();
  }
}
