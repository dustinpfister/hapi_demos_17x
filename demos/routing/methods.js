let Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
path_pack = path.resolve('../../package.json');

let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });

    // respond to any GET or POST request with the same data
    server.route({
        method: ['GET', 'POST'],
        path: '/package',
        handler: async function (request, h) {
            let pack = await new Promise((resolve, reject) => {
                    fs.readFile(path_pack, 'utf8', (e, data) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve(data)
                        }

                    })
                });
            response = h.response(pack);
            response.type('application/json');
            return response;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
