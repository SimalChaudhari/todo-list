
const jwt  = require('jsonwebtoken');
const { ServerError, ApiError } = require('../lib/error-handler');

const generateRefercode = (name) => {
    name = name.replace(/ /g, "");
    let time = Math.ceil(new Date().getTime());
    let no = 0
    for (let i = 0; i < 6; i++) {
        let digit = Math.floor(time % 10);
        no = (no * 10) + digit;
        time = time / 10;

    }

    return name + no;
}

const getexpiretime = (days) => {

    const date = new Date();
    const res = Math.abs(date.getTime()) + (days * 24 * 60 * 60 * 1000);
    return res;

}

const generateinvitationtoken = async (data, secret, res = null) => {
    try {
        const token = await jwt.sign(data, secret, { expiresIn: '7d' });
        return token;
    }
    catch (err) {
        ServerError(res, err);
    }
}

module.exports = { generateRefercode, getexpiretime, generateinvitationtoken };