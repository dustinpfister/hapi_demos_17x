let Hapi = require('@hapi/hapi');
let init = async() => {

    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

    // etag based on the time the server started
    let startTime = new Date(),
    etag = startTime.getTime();

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            h.entity({
                etag: etag
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
