const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  ServerError,
  AuthError,
  ApiError,
} = require("@lib/error-handler/index");
const { userTable } = require("../../models/index");
const { ROLES } = require("../../config/constant");
const { ApiSuccess } = require("@lib/success-handler/index");
const { sendMail } = require("@lib/mailer/index");
const { resetdetails } = require("../../util/index");

// jwt authorization
const jwtauthorization = async (req, res, next) => {

  try {
    const authheader = req.headers.authorization;
    if (authheader) {
      const token = authheader.split(" ")[1];
      
      const user = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
     
      if (!user) {
        AuthError(res, "Token expired");
      } else {
        const isadmin = await userTable.findOne({
          where: { id: user.id, role: ROLES.Admin },
        });
        if (isadmin) {
          req.user = isadmin;
          next();
        } else {
          AuthError(res, "You Don't have access to this services");
        }
      }
    } else {
      AuthError(res, "Missing token");
    }
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      AuthError(res, "token expired");
    } else if (err.name == "JsonWebTokenError") {
      AuthError(res, "Invalid token");
    } else {
      ServerError(res, err);
    }
  }
};

// login using email and password
const login = async (req, res) => {
  
  const pass = await bcrypt.hash(req.body.password, 10);
  console.log(pass);
  try {
    const admin = await userTable.findOne({
      where: { email: req.body.email, role: ROLES.Admin },
    });

    if (admin) {
      if (admin.isBlocked) {
        ApiError(res, "Your account is isBlocked");
      } else if (!admin.isActive) {
        ApiError(res, "Your account is in Active");
      } else {
        if (admin != null) {
          const password = admin.password;
          const isvalid = await bcrypt.compare(req.body.password, password);

          if (isvalid) {
            const token = await jwt.sign(
              {
                id: admin.id,
              },
              process.env.JWT_SECRET_ADMIN,
              { expiresIn: "1d" }
            );

            ApiSuccess(res, { token, admin });
          } else {
            AuthError(res, `Incorrect password`);
          }
        } else {
          AuthError(res, "Please Register");
        }
      }
    } else {
      AuthError(res, "Invalid email ");
    }
  } catch (err) {
    ServerError(res, err);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const admin = await userTable.findOne({
      where: { email: req.body.email, role: ROLES.Admin },
    });

    if (admin) {
      const details = resetdetails(admin.email, process.env.HP_RESET_SECRET);
      const link = `${process.env.HP_URL}/reset-password/${details.token}`;
      console.log(link);

      await userTable.update(
        { token: details.token },
        { where: { id: admin.id } }
      );

      const resetmail = await sendMail(
        process.env.EMAIL,
        admin.email,
        "Reset Password",
        "resetpassword.ejs",
        { link, name: admin.first_name }
      );
      ApiSuccess(res, resetmail, req);
    } else {
      ApiError(res, "Account not exist", req);
    }
  } catch (err) {
    ServerError(res, err, req);
  }
};

// password will be reset by using the url that is receive by user
const resetpassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const resetpassword = await userTable.findOne({
      where: { email: req.user.email, token: token, role: ROLES.Admin },
    });

    if (resetpassword) {
      const isOldPass = await bcrypt.compare(password, resetpassword.password);
      if (isOldPass) {
        ApiError(res, "Password same as old password", req);
      } else {
        const pass = await bcrypt.hash(password, 10);
        await userTable.update(
          { password: pass, token: token },
          { where: { id: resetpassword.id } }
        );
        ApiSuccess(res, "password Reset successfully", req);
      }
    } else {
      ApiError(res, "Invalid link ", req);
    }
  } catch (err) {
    ServerError(res, err, req);
  }
};

// password will be reset by using the url that is receive by user
const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(req.user);
    const resetpassword = await userTable.findOne({
      where: { id: req.user?.id, role: ROLES.Admin },
    });

    if (resetpassword) {
      const isOldPass = await bcrypt.compare(password, resetpassword.password);
      if (isOldPass) {
        ApiError(res, "Password same as old password", req);
      } else {
        const pass = await bcrypt.hash(password, 10);
        await userTable.update(
          { password: pass },
          { where: { id: resetpassword.id } }
        );
        ApiSuccess(res, "password Reset successfully", req);
      }
    } else {
      ApiError(res, "Invalid link ", req);
    }
  } catch (err) {
    ServerError(res, err, req);
  }
};

const checkresettoken = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (token) {
      const tokendata = await jwt.verify(token, process.env.HP_RESET_SECRET);

      if (tokendata) {
        req.user = { email: null };
        req.user.email = tokendata.email;
        next();
      } else {
        AuthError(res, "invalid invitation token", req);
      }
    } else {
      ApiError(res, "Missing token", req);
    }
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      AuthError(res, "token expired", req);
    } else if (err.name == "JsonWebTokenError") {
      AuthError(res, "Invalid token", req);
    } else {
      ServerError(res, err, req);
    }
  }
};

module.exports = {
  login,
  forgetPassword,
  resetpassword,
  changePassword,
  jwtauthorization,
  checkresettoken,
};
