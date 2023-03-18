const jwt = require('jsonwebtoken');
const registerUserModal = require('../../db/user');
const doctorModal = require('../../db/doctor');
const rollbar = require('../../config/rollbar');

exports.userValidateToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).json({errors: [{message: 'No auth token provides', status: false, errs: error}]});
        }
        const t = req.headers.authorization;
       
        if (t !== undefined) {
            const token = req.headers.authorization.split(' ')[1];
            const userinfo = jwt.verify(token, process.env.USER_JWT_LOGIN_SECRET);

            if (!userinfo || !token) {
                return res.status(500).json({errors: [{message: 'Invalid Token', status: false}]});
            }

            if (userinfo.role !== 'user') {
                return res.status(500).json({errors: [{message: 'You are not user', status: false}]});
            }

            const isuserexist = await registerUserModal.findById(userinfo._id);
            if (isuserexist) {
                req.user = userinfo;
                next();
            } else {
                return res.status(500).json({errors: [{message: 'Logout and Login again', status: false, errs: error}]});
            }
        } else {
            return res.status(500).json({errors: [{message: 'Token not provided', status: false}]});
        }
    } catch (error) {
        rollbar.log(error.message)
        return res.status(500).json({errors: [{message: 'Token is expire or invalid', status: false, errs: error}]});
    }
};


exports.doctorValidateToken = async (req, res, next) => {
    try {
        const t = req.headers.authorization;
        if (t !== undefined) {
            const token = req.headers.authorization.split(' ')[1];
            const doctorInfo = jwt.verify(token, process.env.DOCTOR_JWT_LOGIN_SECRET);

            if (!doctorInfo || !token) {
                return res.status(401).json({errors: [{message: 'Invalid Token', status: false}]});
            }

            const isuserexist = await doctorModal.findById(doctorInfo._id);

            if (isuserexist.role !== 'doctor') {
                return res.status(401).json({errors: [{message: 'You are not doctor', status: false}]});
            }

            if (isuserexist) {
                req.user = doctorInfo;
                next();
            } else {
                return res.status(401).json({errors: [{message: 'Logout and Login again', status: false, errs: error}]});
            }
        } else {
            return res.status(401).json({errors: [{message: 'Token not provided', status: false}]});
        }
    } catch (error) {
        rollbar.log(error.message)
        return res.status(401).json({errors: [{message: 'Token is expire or invalid', status: false, errs: error}]});
    }
};


