import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from './../models/User';

export class UserController {

    // list alll users
    static getAll = async ( req: Request, res: Response ) => {

        try {
            const user = await User.findAll({ 
                attributes: ['id', 'name', 'username', 'rol']
            });

            res.status(HttpStatus.OK).send( user );

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            });            
        }
    }

    // list user with ID
    static show = async ( req: Request, res: Response ) => {
        const { id } = req.params;

        try {
            const usuario = await User.findByPk( 
                id, { attributes: ['id', 'name', 'username', 'rol'] } 
            );

            if ( usuario ) res.status(HttpStatus.OK).send( usuario );

            res.status(HttpStatus.NOT_FOUND).send({ 
                message: 'User with the specified ID does not exists'
            });
            
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({
                message: 'Error internal server',
                error: error.message 
            });
        }

    }

    // Create new user
    static create = async ( req: Request, res: Response ) => {
        const data = req.body;

        if(!data) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                message: 'Error internal server' 
            });
        }

        // hash - encryption password
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync( data.password, salt);
        
        try {
            const user = await User.create( data );
            return res.status(HttpStatus.CREATED).json({
                message: 'User create correct!!',
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    rol: user.rol
                },
            });

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error internal server', 
                error: error 
            });
        }
    }

    // Update user
    static update = async ( req: Request, res: Response ) => {
        const { id } = req.params;
        const data = req.body;
        
        if(!data) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                message: 'Error internal server' 
            });
        }
        
        try {
            const [ user ] = await User.update( data, { 
                where: { id: id }
            });

            if (user) {
                const updatedUser = await User.findOne({ where: { id: id } });
                return res.status(HttpStatus.OK).json({ 
                    user: updatedUser 
                });
            }

            throw new Error('User not found');
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error internal server', 
                error: error.message 
            });
        }
    }

    // Delete user
    static destroy = async ( req: Request, res: Response ) => {
        const { id } = req.params;

        try {
            const user = await User.destroy({
              where: { id: id }
            });
            if (user) {
              return res.status(HttpStatus.OK).send("User deleted");
            }
            throw new Error("User not found");
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ 
                message: 'Error internal server',
                error: error.message
            });
        }
        
    }
}