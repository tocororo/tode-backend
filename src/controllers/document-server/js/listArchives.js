const fs = require('fs')
const path = require('path')


module.exports = function listArchives(rootDir, excludeDirs) {
    return fs.readdirSync(rootDir).reduce(function (list, file) {
        const name = path.join(rootDir, file);
        if (fs.statSync(name).isDirectory()) {
            if (excludeDirs && excludeDirs.length) {
                excludeDirs = excludeDirs.map(d => path.normalize(d));
                const idx = name.indexOf(path.sep);
                const directory = name.slice(0, idx === -1 ? name.length : idx);
                if (excludeDirs.indexOf(directory) !== -1)
                    return list;
            }
            return list.concat(listArchives(name, excludeDirs));
        }
        return list.concat([name]);
    }, []);
}