// 清除 初始化目录
const {dirFolder} = require('./assetEvent')
const {rmSync} = require('fs')
const {join} = require('path')
const cleanFileName = ['template', 'optionScript']

module.exports = function(){
    cleanFileName.forEach(fileName=>{
        const dir = join(dirFolder, fileName)
        rmSync(dir, {recursive: true})
    })
}