let Hapi = require('@hapi/hapi');
let init = async() => {

    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

    // etag based on the time the server started
    let startTime = new Date(),
    etag_server = String(startTime.getTime());

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            // using etag
            h.entity({
                etag: etag_server
            });

            // get client etag
            let etag_client = request.headers['if-none-match'];
            etag_client = etag_client === undefined ? 0 : etag_client.replace(/"/g, '');

            // send response based on etag
            if (etag_client === etag_server) {
                console.log('request for fresh resource');
                return {};
            } else {
                console.log('old cached copy sending the new stuff...');
                return {
                    mess: 'date should only change each time the sever starts',
                    date: new Date()
                };

            }
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
