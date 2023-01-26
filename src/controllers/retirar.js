module.exports = {
    async pagRetirarGet(req, res){
        const EDV = req.body.edv
        console.log(req.body);
        res.render('../views/retirar', {EDV});
    },
}