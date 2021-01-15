const proxy = [
        {
            context: '/users',
            target: 'http://localhost:8080'
        }
    ];
module.exports = proxy;