const {readFileSync, writeFileSync} = require('fs')
const {join, dirname} = require('path')
const {Buffer: {from}} = require('buffer')
const dirFolder = dirname(__dirname) // 代表根目录
const basePath = join(dirFolder, '/config/webpack.base.conf.js')

module.exports = {
    getBaseConfig: function(){
        return readFileSync(basePath).toString()
    },
    changBaseConfig: function(content){
        writeFileSync(basePath, from(content))
    }
}