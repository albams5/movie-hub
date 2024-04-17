import cloudinary from "../services/cloudinary/config";

export function getPublicId(url: any) {
	const regex = /\/v\d+\/(.*?)\.jpg$/;
	const publicId = url.match(regex)
	
	return publicId[1];
}

export async function uploadImageToCloudinary(image: any) {
	console.log("entro en uploadImageToCloudinary");
	console.log({image})
	const match = image.match(/\/([^\/]+\.jpg)$/)
	const filename = match[1]
	console.log({filename})

	const fileNameWithoutExtension = filename?.split(".")[0];
	console.log({ fileNameWithoutExtension });

	const uploadImageToCloudinary = await cloudinary.uploader.upload(image, {
		folder: "movies",
		public_id: "movie_hub" + fileNameWithoutExtension + "-" + Date.now(),
	});

	if (!uploadImageToCloudinary) {
		return "Sync error with cloudinary. The image wasn't uploaded";
	}

	return uploadImageToCloudinary.secure_url;
}

export async function deleteImageFromCloudinary(publicId: any) {
	const destroyImageAtCloudinary = await cloudinary.uploader.destroy(
		publicId
	);
	try {
		console.log({destroyImageAtCloudinary})
		if (destroyImageAtCloudinary.result === "not found") {
			return `The image wasn't found in cloudinary`;
		}
		if (destroyImageAtCloudinary.result === "ok") {
			return `Image deleted successfully`;
		}
	} catch (error) {
		return `Error deleting image: ${error}`;
	}
}
