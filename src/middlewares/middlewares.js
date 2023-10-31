import UsersManager from "../persistencia/dao/managers/userManagerMongo.js";

const um = new UsersManager();

export const publicAcces = (req,res,next) =>{
    if(req.session.username) return res.redirect('/current');
    next();
}

export const privateAcces = (req,res,next)=>{
    if(!req.session.username) return res.redirect('/login');
    next();
}

export const adminAccess = async (req, res, next) => {
    // Asegúrate de que el usuario está autenticado
    if (!req.session.username) return res.redirect('/login');
  
    // Busca al usuario en la base de datos
    const user = await um.findUser(req.session.username);
  
    // Comprueba si el usuario es un administrador
    if (user.role !== 'admin') return res.status(403).send('Forbidden');
  
    // Si todo está bien, pasa al siguiente middleware o ruta
    next();
};

export const userAccess = async (req, res, next) => {
    // Asegúrate de que el usuario está autenticado
    if (!req.session.username) return res.redirect('/login');
  
    // Busca al usuario en la base de datos
    const user = await um.findUser(req.session.username);
  
    // Comprueba si el usuario tiene el rol de 'user'
    if (user.role !== 'user') return res.status(403).send('Forbidden');
  
    // Si todo está bien, pasa al siguiente middleware o ruta
    next();
};
