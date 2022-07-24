import { getAuctionById } from './getAuction'
import { uploadPictureToS3 } from '../lib/uploadPictureToS3'
import commonMiddleware from '../lib/commonMiddleware'

async function uploadAuctionPicture(event) {
	const { id } = event.pathParameters

	const auction = await getAuctionById(id)
	const base64 = event.body.replace(/^data:image\/\w+;base64,/, '')
	const buffer = Buffer.from(base64, 'base64')

	const uploadToS3Result = await uploadPictureToS3(auction.id + '.jpg', buffer)
	console.log('s3 upload', uploadToS3Result)

	return {
		statusCode: 200,
		body: JSON.stringify({}),
	}
}

export const handler = commonMiddleware(uploadAuctionPicture)
