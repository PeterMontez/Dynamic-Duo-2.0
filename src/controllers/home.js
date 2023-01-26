module.exports = {
    async pagInicialGet(req, res) {
        res.render('../views/index', {retirar:false, devolver:false, cadastrar:false});
    },
    async pagInicialPost(req, res){
        
    },
    async openCadastro(req, res){
        res.render('../views/index',{ retirar:false, devolver:false, cadastrar:true})
    },
    
    async openDevolver(req, res){
        res.render('../views/index', {retirar:false, devolver:true, cadastrar:false});
    },
    async openRetirar(req, res){
        res.render('../views/index', {retirar:true, devolver:false, cadastrar:false});
    },
}