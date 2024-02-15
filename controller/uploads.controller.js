const uploadActions = require("../database/upload-actions.js");
const CustomError = require("../utils/custom-error.js");

const uploadsController = {
    uploadFile: async (req, res) => {
        const files = req.files;
        if (!files || files.length === 0) {
            throw new CustomError(400, "File to be uploaded is not in body");
        }
        let savedDocs = [];
        for (const file of files) {
            const savedDoc = await uploadActions.addUpload({
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                address: "/public/uploads/" + file.filename,
                uploader: req.userData._id,
            });
            savedDocs.push(savedDoc);
        }
        if (savedDocs.length === 1) {
            savedDocs = savedDocs[0];
        }
        res.json({
            success: true,
            message: "file has been uploaded",
            data: savedDocs,
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
