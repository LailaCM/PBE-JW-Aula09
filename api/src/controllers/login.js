const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const Login = (req, res) => {
    const { user, psw } = req.body;
    
    try {
        const correctPassword = ((user === "eu@gmail.com") && (psw === "Senha"));

        if(!correctPassword) return res.status(401).send({message:'E-mail or Password incorrect !'});

        const token = jsonwebtoken.sign(
            {
                id: crypto.randomUUID(),
                name: "Fulano da Silva",
                avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
            },
            process.env.SECRET_JWT,
            { expiresIn: "2min" }
        );

        return res.status(200).json({ token : token }).end();
    }catch(err) {
        return res.status(500).send(err).end();
    }
};

module.exports = {
    Login
}