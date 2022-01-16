const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const { getJwt } = require("../../services/auth")

module.exports = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email | !password) {
            throw { code: 403, message: "campos requeridos" };
        }

        // primero vamos a buscar el usuario en la bd

        const user = await User.findOne({ where: {
            email
        }})

        // devuelve un true si la comparación del pass con el hash es correcta
        if (!bcrypt.compareSync(password, user.password)) {
            throw { code: 403, message: "password incorrecto" };
        }

        const token = getJwt({
            id: user.id,
            email: user.email,
        })

        res.send({ code: 200, user, token})

    } catch (err) {
        return res.status(err.code || 500).send({
            message: "error de sistema",
            detail: err.message,
        });
    }
}