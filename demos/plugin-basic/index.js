let Hapi = require('@hapi/hapi');

let myPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example


        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {

                return 'hello world this is ' + options.mess;
            }
        });

        // etc ...
        //await someAsyncMethods();
    }
};

let init = async() => {

    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
/*
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
	*/

    await server.register({
        plugin: myPlugin,
        options: {
            mess: 'foobar'
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
