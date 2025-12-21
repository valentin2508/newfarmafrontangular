const PROXY_HOST = 'http://localhost:8000';

const PROXY_CONFIG =[
    {
        context:['/api'],
        target: PROXY_HOST,
        secure:false,
        changeOrigin: true,

    },
];

module.exports =PROXY_CONFIG;