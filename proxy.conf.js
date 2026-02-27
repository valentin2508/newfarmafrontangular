const PROXY_HOST = 'https://pure-charisma-production-5f5b.up.railway.app';

const PROXY_CONFIG =[
    {
        context:['/api'],
        target: PROXY_HOST,
        secure:false,
        changeOrigin: true,

    },
];

module.exports =PROXY_CONFIG;