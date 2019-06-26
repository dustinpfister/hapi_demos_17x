let Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
util = require('util'),
dir_posts = path.resolve('./posts');

let readdir = util.promisify(fs.readdir);

let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });

    server.route({
        method: 'GET',
        path: '/',
        handler: async function (request, h) {
            let years = await readdir(dir_posts);
            return years;
        }
    });

    server.route({
        method: 'GET',
        path: '/{year}',
        handler: async function (request, h) {
            let year = encodeURIComponent(request.params.year);
            let months = await readdir(path.join(dir_posts, year));
            return months;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
