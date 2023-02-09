const path = require('path');
const generateIconNames = require('./typings/generateIconNames');

module.exports = {
    module: { },
    entry: './core/Components/Icon/index.ts',
    output: {path: path.resolve(__dirname, './core', 'Components', 'Icon','index.ts' )},
    mode: 'production',
    context: path.resolve(__dirname, './src' ),
    plugins: [
        function () { this.plugin('done', generateIconNames); }
    ]
};