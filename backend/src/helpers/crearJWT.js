import jwt from 'jsonwebtoken';

const generarJWT = (rol) => {

    return jwt.sign({ rol }, process.env.JWT_SECRET, {expiresIn: '2h'});
};

export default generarJWT;