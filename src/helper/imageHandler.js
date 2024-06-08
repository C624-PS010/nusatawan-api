const supabase = require("../data/supabase");
const { decode } = require("base64-arraybuffer");
const { CustomError } = require("../helper/customError");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const uploadImage = async (file, folder) => {
  // Compress and resize the image using sharp
  const compressedImageBuffer = await sharp(file.buffer)
    .resize({ width: 800 }) // Resize the image to a maximum width of 800 pixels (adjust as needed)
    .jpeg({ quality: 80 }) // Set JPEG quality to 80% (adjust as needed)
    .toBuffer();

  // decode file buffer to base64
  const fileBase64 = decode(compressedImageBuffer.toString("base64"));

  // upload the file to supabase
  const { data, error } = await supabase.storage
    .from(`nusatawan-images/${folder}`)
    .upload(uuidv4(), fileBase64, {
      contentType: "image/png",
    });

  if (error) {
    throw new CustomError(error.status, error.message);
  }

  return data.path;
};

const downloadImage = async (folder, file) => {
  const { data, error } = await supabase.storage.from(`nusatawan-images/${folder}`).download(file);

  if (error) {
    throw new CustomError(error.status, error.message);
  }

  return data;
};

module.exports = { uploadImage, downloadImage };
