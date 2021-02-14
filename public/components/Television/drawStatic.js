let imageData;

export default function drawStatic({ canvas, context, time }) {
  const { random, round } = Math;
  const { height, width } = canvas;

  if (!imageData) {
    imageData = context.createImageData(width, height);
  }

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = round(random()) > 0 ? 255 : 75;
    imageData.data[i + 0] = value; // R value
    imageData.data[i + 1] = value; // G value
    imageData.data[i + 2] = value; // B value
    imageData.data[i + 3] = 255; // A value
  }

  context.putImageData(imageData, 0, 0);
}
