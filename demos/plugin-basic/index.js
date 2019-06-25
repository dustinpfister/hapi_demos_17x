let Hapi = require('@hapi/hapi');
// a very basic plugin
let pluginRoot = {
    name: 'pluginRoot',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {
                return 'hello world this is ' + options.mess;
            }
        });
    }
};
// use it with server.register
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    await server.register({
        plugin: pluginRoot,
        options: {
            mess: 'foobar'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
