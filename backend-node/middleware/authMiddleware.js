import jwt from 'jsonwebtoken'


// Funçã para verificar token
export const verificarToken = (req, res, next) => {

    // pegar o token do header da requisiçã
    const bearerHeader = req.headers['authorization'];

    // checando se é diferene de undefinied
    if(typeof bearerHeader !== 'undefined') {

        // separar o bearer
        const bearer = bearerHeader.split(" ");

        // pegar o token do array
        const token = bearer[1];

        const chave = process.env.JWT_SECRET; 

        // verifica se é um token valido
        jwt.verify(token, chave, (err, authData) => {
            if(err) {

                return res.sendStatus(403); 
            }
            
            
            req.authData = authData; 
            next(); 
        });
    }
    else {
        // se é mando o status proibido
        res.sendStatus(403);
    }
}