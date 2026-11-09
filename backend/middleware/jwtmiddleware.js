// ya custom middle ware ki file ha application.use wlaa koi or tha middle ware// jo  humy bja jata ha data wo req ma ata ha 
import jwt from 'jsonwebtoken';
export const jwtMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            status: false,
            message: "No token",

        });

    }
    try {
         //   ya wlaa vaiable jo ha is ma id nam eor email raka aw aha decde ma sve ha wo index wali filr ma hm na raka w aha 
        const decode = jwt.verify( 
            token,
            process.env.JWT_SECRET

        );
        req.user = decode;
        next();
    } catch (e) {
        return res.status(401).json({
            status: false,
            message: "invalid  token",

        });
    }

};     