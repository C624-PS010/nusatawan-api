const { Router } = require("express");
const { downloadImage } = require("../helper/imageHandler");

const router = Router();

router.get("/:folder/:file", async (req, res, next) => {
  try {
    const { folder, file } = req.params;

    const data = await downloadImage(folder, file);

    const imageData = await data.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.status(200).send(Buffer.from(imageData));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
