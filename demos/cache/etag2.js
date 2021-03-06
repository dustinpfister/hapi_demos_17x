let Hapi = require('@hapi/hapi'),
fs = require('fs'),
readdir = require('util').promisify(fs.readdir),
dir_folders = process.argv[2] || process.cwd(),
delay = process.argv[3] || 10000;
let init = async() => {

    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

    // gen etag
    let genEtag = (function () {
        let c = 0;
        return () => {
            let startTime = new Date();
            c += 1;
            c %= 100;
            return startTime.getTime() + ':' + c;
        };
    }
        ());

    // first etag
    let etag_server = genEtag();
    // update etag each delay
    setInterval(() => {
        etag_server = genEtag();
    }, delay);

    // set up the route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            // using etag_server for each request
            h.entity({
                etag: etag_server
            });

            // get client etag
            let etag_client = request.headers['if-none-match'];
            etag_client = etag_client === undefined ? 0 : etag_client.replace(/"/g, '');

            // send response based on client etag
            // compared to server etag
            if (etag_client === etag_server) {
                console.log('request for fresh resource');
                return {};
            } else {
                console.log('old cached copy getting the new stuff...');
                return readdir(dir_folders).then((contents) => {
                    return {
                        date: new Date(),
                        etag_server: etag_server,
                        contents: contents
                    }
                })
            }

        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
