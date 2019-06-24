let Hapi = require('@hapi/hapi');

let init = async() => {

    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            pug: require('pug')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            //return 'Hello World!';
            return h.view('index.pug');
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
