const { deepStrictEqual } = require('assert');
const fs = require('fs');

fs.readFile('./src/core/colors.scss', function (err, data) {
    if (err) throw err;
    const array = data.toString().split('\n');

    const colorResult = [];

    colorResult.push('export enum Color {');

    array.forEach((line, i) => {
        if (line.indexOf('$') > -1) {
            colorResult.push(line.replace('$', '').replace(': ', '=\'').replace(';', '\',').replace(/\+|\-/ig, '_'));
        }
    });

    colorResult.push('}');

    fs.writeFileSync('./src/Color.ts', colorResult.join('\n'));
});