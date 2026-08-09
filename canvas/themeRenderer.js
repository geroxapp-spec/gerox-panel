import { loadImage } from "./utils.js";

export async function renderTheme({
  ctx,
  themeName,
  deal,
  business,
  productImg,
  logoImg
}) {

  const bg = await loadImage(`./canvas/themes/${themeName}/background.png`);
  const fg = await loadImage(`./canvas/themes/${themeName}/foreground.png`);
  const config = await fetch(`./canvas/themes/${themeName}/config.json`)
    .then(r => r.json());

  // 1️⃣ Background
  ctx.drawImage(bg, 0, 0, 1080, 1080);

  // 2️⃣ Product
  if (productImg) {
    const p = config.productImage;
    ctx.drawImage(productImg, p.x, p.y, p.width, p.height);
  }

  // 3️⃣ Logo
  if (logoImg) {
    const l = config.logo;
    ctx.drawImage(logoImg, l.x, l.y, l.width, l.height);
  }

  // 4️⃣ Text
  drawThemeText(ctx, deal, config);

  // 5️⃣ Foreground (EN SON)
  ctx.drawImage(fg, 0, 0, 1080, 1080);
}

function drawThemeText(ctx, deal, config) {

  // CATEGORY
  ctx.fillStyle = "#E30613";
  ctx.font = "bold 28px Arial";
  ctx.fillText(
    deal.category.toUpperCase(),
    config.category.x,
    config.category.y
  );

  // TITLE
  ctx.fillStyle = "#111";
  ctx.font = "900 96px Arial Black";
  ctx.fillText(
    deal.title.toUpperCase(),
    config.title.x,
    config.title.y
  );

  // OLD PRICE
  if (deal.old_price) {
    ctx.fillStyle = "#777";
    ctx.font = "bold 40px Arial";
    ctx.fillText(
      deal.old_price + " ₺",
      config.oldPrice.x,
      config.oldPrice.y
    );
  }

  // NEW PRICE
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 150px Arial Black";
  ctx.fillText(
    deal.new_price + " ₺",
    config.newPrice.x,
    config.newPrice.y
  );

  // DATE
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px Arial";
  ctx.fillText(
    deal.date_text,
    config.date.x,
    config.date.y
  );
}
