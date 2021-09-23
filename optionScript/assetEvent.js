const {readFileSync, writeFileSync} = require('fs')
const {join, dirname} = require('path')
const {Buffer: {from}} = require('buffer')
const dirFolder = dirname(__dirname) // 代表根目录
const basePath = join(dirFolder, '/config/webpack.base.conf.js')

// 获取文件内容
function getContent(path){
    return readFileSync(path).toString()
}
function writeContent(path, content){
    writeFileSync(path, from(content))
}

module.exports = {
    getBaseConfig: function(){
        return getContent(basePath)
    },
    changBaseConfig: function(content){
        writeContent(basePath, content)
    },
    getContent,
    writeContent,
    dirFolder
}