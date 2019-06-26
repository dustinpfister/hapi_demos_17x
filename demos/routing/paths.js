let Hapi = require('@hapi/hapi'),
fs = require('fs'),
path = require('path'),
util = require('util'),
dir_posts = path.resolve('./posts');

let readdir = util.promisify(fs.readdir);
let readFile = util.promisify(fs.readFile);

let init = async() => {
    let server = Hapi.server({
            port: process.env.PORT || process.argv[2] || 3000,
            host: 'localhost'
        });

    // a path can just be a string
    server.route({
        method: 'GET',
        path: '/',
        handler: async function (request, h) {
            let years = await readdir(dir_posts);
            return years;
        }
    });

    // you can aso have params as well in the string
    server.route({
        method: 'GET',
        path: '/{year}',
        handler: async function (request, h) {
            let months = await readdir(path.join(dir_posts, request.params.year));
            return months;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}',
        handler: async function (request, h) {
            let days = await readdir(path.join(dir_posts, request.params.year, request.params.month));
            return days;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}/{day}',
        handler: async function (request, h) {
            let posts = await readdir(path.join(dir_posts, request.params.year, request.params.month, request.params.day));
            return posts;
        }
    });
    server.route({
        method: 'GET',
        path: '/{year}/{month}/{day}/{post}',
        handler: async function (request, h) {
            file = await readFile(path.join(dir_posts, request.params.year, request.params.month, request.params.day, request.params.post),'utf8');
            return file;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
