let Hapi = require('@hapi/hapi');

let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });

    server.route({
        method: 'GET',
        path: '/',
        // a handler can just return a static
        // string
        handler: function (request, h) {
            return '<a href=\"/response\">response</a>';
        }
    });

    server.route({
        method: 'GET',
        path: '/response',
        // Another options is the h.response
        // response toolkit method
        handler: function (request, h) {
            let response = h.response({
                    foo: 'bar'
                });
            response.type('application/json');
            return response;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
