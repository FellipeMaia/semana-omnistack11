const con = require('../database/connection');
const crypto = require('crypto');


module.exports = {
    async create(req,res){
        const { name, email, whatsapp, city, uf} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
        await con('ongs').insert({
            id, name, email, whatsapp, city, uf
        });
    
        res.json({"id":id});
    },

    async index(req,res){
        const ongs = await con('ongs').select('*');
    
        return res.json(ongs);
    }

}