const {
  RatePlanContext,
} = require("twilio/lib/rest/preview/wireless/ratePlan");
const { loggers } = require("winston");
const rollbar = require("../../config/rollbar");
const status = require("../statusCodes/statuscodes");
const saveErrorLogs = require("../../util/saveErrorLogs");

const ServerError = (res, err, req = null) => {
  logger.error(err);
  rollbar.configure({ logLevel: "critical" });
  rollbar.log(err);
  res
    .status(500)
    .json({
      success: false,
      data: { error: { message: "Internal server error" } },
    });
  if (req != null) {
    saveErrorLogs(req, err.message);
  }
  return;
};

const DatabaseFailure = (res, req = null) => {
  logger.error(status.DATABASE_FAILURE.message);
  rollbar.configure({ logLevel: "critical" });
  rollbar.log(status.DATABASE_FAILURE.message);
  res
    .status(status.DATABASE_FAILURE.code)
    .json({ success: false, error: { message: `Internal Server Error` } });
  if (req != null) {
    saveErrorLogs(req, status.DATABASE_FAILURE.message);
  }
  return;
};

const MissingInput = (res, error, req = null) => {
  rollbar.configure({ logLevel: "critical" });
  rollbar.log(error);
  res
    .status(status.MISSING_INPUT.code)
    .json({ success: false, data: { error } });
  if (req != null) {
    saveErrorLogs(req, error.message);
  }
  return;
};

const AuthError = (res, msg, req = null) => {
  rollbar.configure({ logLevel: "critical" });
  rollbar.log(msg);
  res.status(401).json({ success: false, error: { message: msg } });
  if (req != null) {
    saveErrorLogs(req, msg);
  }
  return;
};

const UnAuthorize = (res, req = null) => {
  rollbar.configure({ logLevel: "info" });
  rollbar.log("User dont have access to this page");
  res
    .status(status.UNAUTHORIZED_ACCESS.code)
    .json({
      success: false,
      error: { message: `Your Dont have Access to thise page` },
    });
  if (req != null) {
    saveErrorLogs(req, "User dont have access to this page");
  }
  return;
};

const AlredyExist = (res, req = null) => {
  rollbar.configure({ logLevel: "info" });
  rollbar.log("User already exist");
  res
    .status(status.ALREADY_EXIST.code)
    .json({ success: false, error: { message: `Already Exist` } });
  if (req != null) {
    saveErrorLogs(req, "User already exist");
  }
  return;
};
const NotFound = (res, req = null) => {
  rollbar.configure({ logLevel: "error" });
  rollbar.log("Data Not found");
  res
    .status(status.DATA_NOT_FOUND.code)
    .json({ success: false, error: { message: `Data Not found` } });
  if (req != null) {
    saveErrorLogs(req, "Data Not found");
  }
  return;
};

const ValidattionFail = (res, req = null) => {
  rollbar.configure({ logLevel: "error" });
  rollbar.log(status.VALIDATION_FAILURE.message);
  res
    .status(status.VALIDATION_FAILURE.code)
    .json({
      success: false,
      error: { message: status.VALIDATION_FAILURE.message },
    });
  if (req != null) {
    saveErrorLogs(req, status.VALIDATION_FAILURE.message);
  }
  return;
};

const InputError = (res, error, req = null) => {
  rollbar.configure({ logLevel: "error" });
  rollbar.log(error);
  res
    .status(status.INCORRECT_INPUT_DATA.code)
    .json({ success: false, error: { message: error.details[0].message } });
  if (req != null) {
    saveErrorLogs(req, error.message);
  }
  return;
};

const ApiError = (res, message, req = null) => {
  rollbar.configure({ logLevel: "error" });
  rollbar.log(message);
  res.status(400).json({ success: false, error: { message: message } });
  if (req != null) {
    saveErrorLogs(req, message);
  }
  return;
};

module.exports = {
  ServerError,
  ValidattionFail,
  DatabaseFailure,
  NotFound,
  MissingInput,
  UnAuthorize,
  AlredyExist,
  InputError,
  ApiError,
  AuthError,
};
