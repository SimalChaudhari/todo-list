const STATUS_CODES = {
	API_SUCCESS: {
		code: 200,
		message: 'Api operation was successful',
	},
	API_CREATED: {
		code: 201,
		message: 'Api insert operation was successful',
	},
	NOT_MODIFIED: {
		code: 304,
		message: 'Desired result already exist',
	},
	API_FAILURE: {
		code: 500,
		message: 'Api operation was unsuccessful',
	},
	VALIDATION_FAILURE: {
		code: 400,
		message: 'Validation failed',
	},
	ALREADY_EXIST:{
		code : 400,
		message:"Record Alredy Exist"
	},
	DATA_NOT_FOUND: {
		code: 400,
		message: 'User data not found',
	},
	DATABASE_FAILURE: {
		code: 500,
		message: 'Database operation was unsuccessful',
	},
	EXTERNAL_FAILURE: {
		code: 500,
		message: 'External failure',
	},
	INTERNAL_FAILURE: {
		code: 500,
		message: 'Internal failure',
	},
	INCORRECT_INPUT_DATA: {
		code: 400,
		message: 'Incorrect input data ',
	},
	MISSING_INPUT: {
		code: 400,
		message: 'Input is missing',
	},
	NOT_FOUND: {
		code: 404,
		message: 'Page not found',
	},
	UNAUTHORIZED_ACCESS: {
		code: 401,
		message: 'Unauthorized access',
	},
	FORBIDDEN_ACCESS: {
		code: 403,
		message: 'Forbidden access',
	},
};

module.exports = STATUS_CODES;
