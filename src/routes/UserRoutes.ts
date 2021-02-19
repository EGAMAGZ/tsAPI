import {Request, Response, Router} from 'express';

import User from '../models/User';

class UserRoutes{
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getUsers(req: Request, res: Response): Promise<void>{
        const users = await User.find();
        res.json(users);
    }

    public async getUser(req: Request, res: Response): Promise<void>{
        // Regresa Objeto (findOne), no Arreglo de objetos (find)
        // const user = await User.findOne({url: req.params.username}).populate('posts'); Obtiene todos los datos de posts
        const user = await User.findOne({username: req.params.username}).populate('posts', 'title url -_id'); // Obtiene solo el titulo y url, sin id
    
        res.json(user); // Si no existe, devuelve null
    }

    public async createUser(req: Request, res: Response): Promise<void>{
        const newUser = new User(req.body);
        await newUser.save(); // Devuelve Json
        // Para validar entradas puede ser manual o usando express-validator, o usando JWT

        res.json({data: newUser});
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username: username}, req.body, {new: true});

        res.json(user);
    }

    public async deleteUser(req: Request, res: Response): Promise<void>{
        
        const {username} = req.params;
        await User.findOneAndDelete({username});

        res.json({response: 'User Deleted Sucessfully'});
    }

    routes(){
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;