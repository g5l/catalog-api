const sharp = require('sharp');

function resize(buffer) {
  const image = sharp(buffer)
    .resize(500)
    .jpeg({ quality: 80 })
    .toBuffer();

  return image;
}
module.exports = resize;
