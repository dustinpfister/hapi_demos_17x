let Hapi = require('@hapi/hapi');
// a very basic plugin
exports.pluginRoot = {
    name: 'pluginRoot',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {
                return 'hello world this is ' + options.mess;
            }
        });
    }
};