let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    await server.register(require('@hapi/vision'));
    // set up pug as a view engine
    server.views({
        engines: {
            ejs: require('ejs')
        },
        relativeTo: __dirname,
        path: 'views'
    });
    // use pug
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            let res = h.view('index.ejs', {
                    rendered: new Date()
                });
            console.log(res)
            return res;
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
