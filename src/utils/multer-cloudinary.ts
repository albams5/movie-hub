import multer from "multer";
import cloudinary from "../services/cloudinary/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
});

console.log("storage", storage)

const filter = (req: any, file: any, cb: any) => {
  // console.log("dentro de filter")
	if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
		return cb(
			new Error("Only images with jpg, jpeg, png, or gif formats are allowed"),
			false
		);
	}
	cb(null, true);
};

const multerCloudinaryImage = multer({
	storage: storage,
	fileFilter: filter,
	limits: {
		fileSize: 10 * 1024 * 1024, // no larger than 5mb
	},
})

// console.log("multerCloudinaryImage", multerCloudinaryImage);

export default multerCloudinaryImage;
