import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import env from '../config/env';


export const checkJwt =  ( req: Request, res: Response, next: NextFunction) => {
    const baererHeaders = (req.headers.authorization) ? req.headers.authorization : undefined;
    let token: string;
    let jwtPayload;

    if ( baererHeaders !== undefined ) {
        const baerer = baererHeaders.split(' ');
        token = <string> baerer[1];
    } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Not Authorized!!'});
    }
    
    
    try {
        jwtPayload = <any>jwt.verify( token , env.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Not Authorized!!'});
    }

    const { userId, username } = jwtPayload;

    const newToken = jwt.sign( { userId, username }, env.jwtSecret, { expiresIn: '3h' });
    res.setHeader( 'token', newToken );

    // call next
    next();
}