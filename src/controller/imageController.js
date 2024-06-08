const { downloadImage } = require("../helper/imageHandler");

const imageController = {
  getImage: async (req, res, next) => {
    try {
      const { folder, file } = req.params;

      const data = await downloadImage(file, folder);

      const imageData = await data.arrayBuffer();

      res.setHeader("Content-Type", "image/png");
      res.status(200).send(Buffer.from(imageData));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = imageController;
