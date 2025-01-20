import { imageUploadHelper } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + base64;
    const result = await imageUploadHelper(url);

    return res.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.log("error : ", error);
    return res.json({
      success: false,
      message: "Error occurred while uploading image.",
      error: error,
    });
  }
};

export default handleImageUpload;
