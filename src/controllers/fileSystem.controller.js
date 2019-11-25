var fs = require('fs');
var config = require('config')

const fileSystem = {};

fileSystem.crearDirectorio = (document) => {
var dir = config.data_dir + '/' + document._id;
console.log(dir);
fs.mkdir(dir, function() {
        fs.writeFile(`/${dir}/${document._id}.txt`, `${document.coment}`, function(err) {
            if(err) return console.error(err);            
        });
    });
}

fileSystem.crearVersion = (document_version) => {
    var dir = config.data_dir + '/' + document_version.document._id;
    console.log(document_version.document.name)
            fs.writeFile(`/${dir}/${document_version._id}.txt`, `${document_version.coment}`, function(err) {
                if(err) return console.error(err);            
            });
    }

    

module.exports = fileSystem;