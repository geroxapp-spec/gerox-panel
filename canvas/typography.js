import {C,upperTR,fitFont,wrapLines} from "./utils.js";

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

  return{name:upperTR(t),unit:unit};
}

export function drawProductInfo(ctx,deal){
  const x=60;
  const catY=730;

  ctx.font="800 22px Arial";
  const label=categoryLabel(deal.category);
  const padX=18;
  const w=ctx.measureText(label).width+padX*2;

  ctx.save();
  ctx.fillStyle=C.gold;
  ctx.beginPath();
  ctx.roundRect(x,catY-30,w,40,20);
  ctx.fill();
  ctx.restore();

  ctx.textAlign="left";
  ctx.fillStyle="#111111";
  ctx.fillText(label,x+padX,catY-3);

  const parsed=parseTitle(deal.title);
  const maxW=560;

  let titleSize=68;
  let lines=[];

  while(titleSize>=40){
    lines=wrapLines(ctx,parsed.name,maxW,titleSize,"Arial Black, Arial",2);
    ctx.font="900 "+titleSize+"px Arial Black, Arial";

    let ok=true;
    lines.forEach(l=>{if(ctx.measureText(l).width>maxW)ok=false;});

    if(ok)break;

    titleSize-=4;
  }

  ctx.fillStyle=C.white;
  ctx.font="900 "+titleSize+"px Arial Black, Arial";

  let ty=catY+titleSize+16;

  lines.forEach(line=>{
    ctx.fillText(line,x,ty);
    ty+=titleSize+6;
  });

  if(parsed.unit){
    ctx.fillStyle=C.gold;
    ctx.font="700 30px Arial";
    ctx.fillText(parsed.unit,x,ty+8);
  }
}
