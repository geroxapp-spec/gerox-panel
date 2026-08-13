import { loadImage } from "./utils.js";
import { renderTheme } from "./themeRenderer.js";

export async function renderPoster({ deal, business }) {

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  // Ürün görseli
  let productImg = null;

function createFileName(title){
  return String(title || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/\([^)]*\)/g, "")
    .replace(/ç/g,"c")
    .replace(/ğ/g,"g")
    .replace(/ı/g,"i")
    .replace(/ö/g,"o")
    .replace(/ş/g,"s")
    .replace(/ü/g,"u")
    .replace(/\s+/g,"_")
    .trim() + ".png";
}

const fileName = createFileName(deal.title);
const localPath = `/products/${fileName}`;

try {
  productImg = await loadImage(localPath);
} catch (e) {

  // fallback: image_url varsa onu dene
  if (deal.image_url) {
    productImg = new Image();
    productImg.crossOrigin = "anonymous";
    productImg.src = deal.image_url;

    await new Promise((resolve, reject) => {
      productImg.onload = resolve;
      productImg.onerror = reject;
    });
  }
}

  // Logo
  let logoImg = null;

  if (business?.logo_url) {
    logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = business.logo_url;

    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
    });
  }

  await renderTheme({
    ctx,
    themeName: "premium",
    deal,
    business,
    productImg,
    logoImg
  });

  return canvas;
}
