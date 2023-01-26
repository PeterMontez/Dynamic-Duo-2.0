module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', {retirar:false, devolver:false});
    },
    async pagInicialPost(req, res){
        
    },
    
    async openDevolver(req, res){
        res.render('../views/index', {retirar:false, devolver:true});
    },
    async openRetirar(req, res){
        res.render('../views/index', {retirar:true, devolver:false});
    },
}