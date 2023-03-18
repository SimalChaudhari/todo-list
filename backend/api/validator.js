const joi = require("joi");
const {
  InputError,
  ServerError,
  ApiError,
} = require("../lib/error-handler");
const { userTable } = require("../models/index");

const validateLogin = (req, res, next) => {
  const schema = joi.object({
    email: joi
      .string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email should be valid email`,
        "any.invalid": `email cannot be an empty field`,
        "any.required": `email required`,
      }),
    password: joi
      .string()
      .trim()
      .min(8)
      .invalid("")
      .required()
      .messages({
        "string.base": `password should be a type of 'text'`,
        "string.empty": `password cannot be an empty field`,
        "string.min": `password should contain least 8 characters`,
        "any.invalid": `password cannot be an empty field`,
        "any.required": `password required`,
        "string.pattern.base": `password should contain least 8 characters,minimum of 1 uppercase character [A-Z] , minimum of 1 numeric character [0-9],minimum of 1 special character: ~!@#$%`,
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return InputError(res, error);
  } else {
    next();
  }
};

const validateResetpassword = (req, res, next) => {
  const schema = joi.object({
    password: joi
      .string()
      .trim()
      .min(8)
      .invalid("")
      .pattern(
        new RegExp(
          "(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,15})"
        )
      )
      .required()
      .messages({
        "string.base": `password should be a type of text`,
        "string.empty": `password cannot be an empty field`,
        "string.min": `password should contain least 8 characters`,
        "any.invalid": `password cannot be an empty field`,
        "any.required": `password required`,
        "string.pattern.base": `password should contain least 8 characters,minimum of 1 uppercase character [A-Z] , minimum of 1 numeric character [0-9],minimum of 1 special character: ~!@#$%`,
      }),
    token: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": `token cannot be an empty field`,
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return InputError(res, error);
  } else {
    next();
  }
};

const validateChangePassword = (req, res, next) => {
  const schema = joi.object({
    password: joi
      .string()
      .trim()
      .min(8)
      .invalid("")
      .pattern(
        new RegExp(
          "(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,15})"
        )
      )
      .required()
      .messages({
        "string.base": `password should be a type of text`,
        "string.empty": `password cannot be an empty field`,
        "string.min": `password should contain least 8 characters`,
        "any.invalid": `password cannot be an empty field`,
        "any.required": `password required`,
        "string.pattern.base": `password should contain least 8 characters,minimum of 1 uppercase character [A-Z] , minimum of 1 numeric character [0-9],minimum of 1 special character: ~!@#$%`,
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return InputError(res, error);
  } else {
    next();
  }
};

const validateurl = (req, res, next) => {
  const schema = joi.object({
    id: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.base": `"id" should be a type of 'text'`,
        "string.empty": `"id" cannot be an empty field`,
        "any.required": `"id" required`,
      }),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return InputError(res, error);
  } else {
    next();
  }
};

const validateCreateAdmin = (req, res, next) => {
  const schema = joi.object({
    email: joi
      .string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    name: joi
      .string()
      .trim()
      .required()
      .max(30)
      .required(),
    mobile: joi
      .string()
      .trim()
      .invalid("")
      .required(),
    password: joi
      .string()
      .trim()
      .min(8)
      .invalid("")
      .pattern(
        new RegExp(
          "(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,15})"
        )
      )
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    InputError(res, error);
  } else {
    next();
  }
};

const validateforget = (req, res, next) => {
  const schema = joi.object({
    email: joi
      .string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "string.base": `email should be a type of 'text'`,
        "string.empty": `email cannot be an empty field`,
        "string.email": `email should be valid email`,
        "any.invalid": `email cannot be an empty field`,
        "any.required": `email required`,
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    InputError(res, error);
  } else {
    next();
  }
};


const validateId = (req, res, next) => {
  const schema = joi.object({
    id: joi
      .string()
      .trim()
      .required()
      .messages({
        "string.empty": `id cannot be an empty field`,
        "any.invalid": `id cannot be an empty field`,
        "any.required": `id required`,
      }),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    InputError(res, error);
  } else {
    next();
  }
};

module.exports = {
  validateLogin,
  validateCreateAdmin,
  validateResetpassword,
  validateChangePassword,
  validateurl,
  validateforget,
  validateId,
};
