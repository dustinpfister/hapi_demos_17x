let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

    let startTime = new Date();
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            h.entity({
                etag: startTime.getTime()
            });
            return {
                mess: 'date should only change each time the sever starts',
                date: new Date()
            };
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
