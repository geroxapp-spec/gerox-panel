import { loadImage } from "./utils.js";

export async function renderTheme({
  ctx,
  themeName,
  deal,
  business,
  productImg,
  logoImg
}) {

  const bg = await loadImage(`/themes/${themeName}/background.png`);
  const fg = await loadImage(`/themes/${themeName}/foreground.png`);
  const config = await fetch(`/themes/${themeName}/config.json`)
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
