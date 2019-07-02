self.onmessage = ev => {
  const { img: data, step } = ev.data;
  const { width, height } = data;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.putImageData(data, 0, 0);

  scroll(ctx, width, height, step);
  // self.close();
}
function scroll(ctx, width, height, step) {
  setTimeout(() => {
    const chip = ctx.getImageData(0, 0, width, step);
    const rest = ctx.getImageData(0, step, width, height - step);
    ctx.putImageData(rest, 0, 0);
    ctx.putImageData(chip, 0, height - step);
    const res = ctx.getImageData(0, 0, width, height);
    self.postMessage(res);
    return scroll(ctx, width, height, step);
  }, 20);
}