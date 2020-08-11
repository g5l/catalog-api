const { v4: uuidv4 } = require('uuid');
const resize = require('./resize');
const s3upload = require('./s3upload');

class FileUpload {
  constructor(buffer) {
    this.buffer = buffer;
  }

  static filename() {
    return `${uuidv4()}.png`;
  }

  async getUrl() {
    const fileName = FileUpload.filename();
    const buffer = await resize(this.buffer);

    return s3upload(fileName, buffer);
  }
}

module.exports = FileUpload;
