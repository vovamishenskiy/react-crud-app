import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({id}, config.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

export default generateToken