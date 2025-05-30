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
                name: "Pandinha da Silva",
                avatar: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQq3Y90BwP4UmjAv73YqyJt4ium_ad4ZJ86IRFMKYk8xK-Mg8Uj"
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