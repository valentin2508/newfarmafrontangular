const PROXY_HOST = 'http://localhost:8000';

const PROXY_CONFIG =[
    {
        contex:['/api'],
        target: PROXY_HOST,
        secure:false,
        
    },
];

module.exports =PROXY_CONFIG;