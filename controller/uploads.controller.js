const CustomError = require("../utils/custom-error");
const uploadActions = require("../database/upload-actions.js");

const uploadsController = {
    uploadFile: async (req, res) => {
        const file = req.file;
        const savedDoc = await uploadActions.addUpload({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            address: "/public/uploads/" + file.filename,
            uploader: req.userData._id,
        });
        res.json({
            success: true,
            message: "file has been uploaded",
            data: savedDoc,
        });
    },
    getUpload: async (req, res) => {
        const upload = await uploadActions.getUpload(req.params.filename);
        res.json({
            success: true,
            message: "upload brought successfully",
            data: upload,
        });
    },
};
module.exports = uploadsController;
