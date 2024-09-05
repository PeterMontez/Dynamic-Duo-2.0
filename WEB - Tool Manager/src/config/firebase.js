const https = require('https');
const {HttpsProxyAgent} = require('https-proxy-agent');

const Conection = {};


Conection.open = async ( cabinet, drawer ) => {
    (async () => {

        const proxy = 'http://disrct:etsps2024401@10.224.200.26:8080'; 
    
        // Crie um agente de proxy
        const agent = new HttpsProxyAgent(proxy);
        
        const postData = `true`; 
        
        const req = https.request({
                hostname:'toolmanager-b1304-default-rtdb.firebaseio.com',
                path:`/${cabinet}/${drawer}.json`,
                agent:agent,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                    'Content-Length': Buffer.byteLength(postData)
                }    
            },(res) => {
            let data = '';
    
    
            res.on('data', (chunk) => {
                data += chunk;
            })  ;
    
            res.on('end', () => {
                console.log(JSON.parse(data));
            })  ;
        });
    
        req.on('error', (e) => {
            console.log('errinho'+ e);
        })
    
        req.write(postData);
        req.end()
    
    })()
}

module.exports = Conection;