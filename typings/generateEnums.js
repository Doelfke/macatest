const { exec } = require('child_process');
const fs = require('fs');

exec('tsc -p apiTypes.tsconfig.json', {}, (err, res) => {
    fs.readFile('./typings/apiTypes.d.ts', function (err, data) {
        if (err) throw err;
        const array = data.toString().split('\n');

        const enumResult = [];
        array.forEach((line, i) => {
            if (line.indexOf('enum ') > -1) {
                enumResult.push('export ' + line.replace('export', ''));
                let currentLine = i;
                while (true) {
                    currentLine++;
                    enumResult.push(array[currentLine].replace(/ +(?= )/g, ' '));
                    if (array[currentLine].indexOf('}') > -1) {
                        break;
                    }
                }
            }
        });

        fs.writeFileSync('./src/apiEnums.ts', enumResult.join('\n'));
        fs.unlinkSync('./typings/apiTypes.js');
    });
});


