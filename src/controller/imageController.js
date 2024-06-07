const supabase = require("../data/supabase");
const { decode } = require("base64-arraybuffer");

const imageController = {
  postArticleImage: async (req, res, next) => {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({ message: "Please upload a file" });
        return;
      }

      console.log("ORIGINAL FILE: ", file);

      // decode file buffer to base64
      const fileBase64 = decode(file.buffer.toString("base64"));

      console.log("FILE BASE:", fileBase64);

      // upload the file to supabase
      const { data, error } = await supabase.storage
        .from("nusatawan-images")
        .upload(file.originalname + new Date(), fileBase64, {
          contentType: "image/png",
        });

      if (error) {
        throw error;
      }

      // get public url of the uploaded file
      const { data: image } = supabase.storage.from("images").getPublicUrl(data.path);

      res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = imageController;
