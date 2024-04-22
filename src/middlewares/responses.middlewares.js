const successResponse = (res, data, message = "Success", statusCode = 200) => {
	res.status(statusCode).json({ success: true, message, data });
};

const errorResponse = (
	res,
	data = {},
	message = "Internal Server Error",
	statusCode = 500
) => {
	res.status(statusCode).json({ success: false, message, data });
};

export { successResponse, errorResponse };
