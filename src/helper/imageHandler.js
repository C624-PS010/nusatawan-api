const supabase = require("../data/supabase");
const { decode } = require("base64-arraybuffer");
const { CustomError } = require("../helper/customError");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const uploadImage = async (file, folder) => {
  // Load the image using Jimp
  const image = await Jimp.read(file.buffer);

  // Resize and compress the image
  image
    .resize(800, Jimp.AUTO) // Resize the image to a maximum width of 800 pixels (adjust as needed)
    .quality(80); // Set JPEG quality to 80% (adjust as needed)

  // Get the compressed image buffer
  const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

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

const downloadImage = async (file, folder) => {
  const { data, error } = await supabase.storage
    .from(`nusatawan-images`)
    .download(`${folder}/${file}`);

  if (error) {
    throw new CustomError(error.status, error.message);
  }

  return data;
};

const deleteImage = async (file, folder) => {
  const { data, error } = await supabase.storage
    .from(`nusatawan-images`)
    .remove(`${folder}/${file}`);

  if (error) {
    throw new CustomError(error.status, error.message);
  }

  return;
};

module.exports = { uploadImage, downloadImage, deleteImage };
