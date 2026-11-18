export async function compressImage(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const max = 1280;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Couldn't prepare that photo.");
    ctx.fillStyle = "#f7fbf4";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.72);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't read that photo."));
    img.src = url;
  });
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.readAsDataURL(blob);
  });
}

export async function prepareFile(file: File): Promise<{
  kind: "photo" | "audio" | "video";
  media: string;
}> {
  if (file.type.startsWith("image/")) {
    return { kind: "photo", media: await compressImage(file) };
  }
  if (file.type.startsWith("audio/")) {
    if (file.size > 1_000_000) {
      throw new Error("That audio is too long. Try under about 20 seconds.");
    }
    return { kind: "audio", media: await blobToDataUrl(file) };
  }
  if (file.type.startsWith("video/")) {
    if (file.size > 1_200_000) {
      throw new Error("That video is too big. Try a photo, or a clip under about 1 MB.");
    }
    return { kind: "video", media: await blobToDataUrl(file) };
  }
  throw new Error("Use a photo, an audio file, or a short video.");
}
