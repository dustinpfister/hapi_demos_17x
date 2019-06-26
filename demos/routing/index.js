let Hapi = require('@hapi/hapi');

let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });

    // basic route for the root path
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return 'get request to root';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
