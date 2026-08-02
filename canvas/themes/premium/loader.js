let backgroundImage = null;
let foregroundImage = null;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      console.log("Yüklendi:", src);
      resolve(img);
    };

    img.onerror = (e) => {
      console.error("Yüklenemedi:", src, e);
      reject(new Error(src));
    };

    img.src = src + "?v=" + Date.now();
  });
}

export async function loadTheme() {
  if (!backgroundImage) {
    backgroundImage = await loadImage("/canvas/themes/premium/background.png");
  }

  if (!foregroundImage) {
    foregroundImage = await loadImage("/canvas/themes/premium/foreground.png");
  }

  return {
    background: backgroundImage,
    foreground: foregroundImage
  };
}
