import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import env from '../config/env';
import User from './../models/User';


export class AuthController {

    static signIn = async ( req: Request, res: Response ) => {
        const { username, password } = req.body;
        let user: any;

        // validación de usuario y contraseña
        if( !(username && password ))
            res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password is required'});
        

        try {
            user = await User.findOne({
                where: { username }
            });

            console.log( user )

            // compare hash
            if ( ! bcrypt.compareSync( password , user.password )) 
                res.status(HttpStatus.FORBIDDEN).json({ message: 'username or password incorecct!!'});

            let token = jwt.sign({ 
                userId: user.id, 
                username: user.username 
            }, env.jwtSecret, { expiresIn: '3h'});

            res.status(HttpStatus.OK).json({
                user: { 
                    id: user.id, 
                    name: user.name,
                    username: user.username,
                    rol: user.rol
                },
                token,
                message: 'User success full'
            });

        } catch (error) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'username or password incorecct!!'});
        }
                
    }
}