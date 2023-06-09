const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req,rest, next){

        var role = req.body.role;

        //cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth:false, message:'Token tidak terdata'});
                }else{
                    if(role ==2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status(401).send({auth:false, message:'Gagal mengautorisasi role anda'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth:false, message:'Token tidak terseedia'});
        }
    }
}

module.exports = verifikasi;