const supabase = require("../data/supabase");
const { decode } = require("base64-arraybuffer");
const { CustomError } = require("../helper/customError");

const imageController = {
  postArticleImage: async (req, res, next) => {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({ message: "Please upload a file" });
        return;
      }

      // decode file buffer to base64
      const fileBase64 = decode(file.buffer.toString("base64"));

      // upload the file to supabase
      const { data, error } = await supabase.storage
        .from("nusatawan-images")
        .upload(+new Date() + "-" + file.originalname, fileBase64, {
          contentType: "image/png",
        });

      if (error) {
        throw error;
      }

      // get public url of the uploaded file
      const result = supabase.storage.from("nusatawan-images").getPublicUrl(data.path);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  getArticleImage: async (req, res, next) => {
    try {
      const { name } = req.params;

      const { data, error } = await supabase.storage.from("nusatawan-images").download(name);

      if (error) {
        throw new CustomError(error.status, error.message);
      }

      console.log(data);

      const imageData = await data.arrayBuffer();

      console.log(imageData);
      res.setHeader("Content-Type", "image/jpeg");

      // Send the image data as a response
      res.status(200).send(Buffer.from(imageData));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = imageController;
