let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({port: 3000,host: 'localhost'});
    await server.register({
        plugin: require('./module').pluginRoot,
        options: {
            mess: 'foobar'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
