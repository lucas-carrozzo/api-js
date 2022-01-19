const { User } = require("../../db/models");
const { verifyJwtAndLoadPayload } = require("../../services/auth")

module.exports = async (req, res) => {
    try {
        // "Bearer dhasuidysa78d6sad6as"
        const { authorization } = req.headers

        // const [p1, token] = authorization.split(" ")
        
        if (!authorization) {
            throw { code: 403, message: "jwt requerido" };
        }

        const splitString = authorization.split(" ")
        const token = splitString[1]

        //
        const payload = await verifyJwtAndLoadPayload(token)
        // 1. chequear que el iat no haya expirado
        const nowMiliseconds = (new Date().getTime() + 1) / 1000
        
        if (nowMiliseconds <= payload.iat) {
            // el token esta expirado y deberiamos devolver un error
            throw { code: 403, message: "jwt expirado" };
        }

        // 2. Cargar el usuario de la bd a partir del userId
        const user = await User.findByPk(payload.userId)

        res.send({ code: 200, user, })
    } catch(err) {
        return res.status(err.code || 500).send({
            message: "error de sistema",
            detail: err.message
        });
    }
}
