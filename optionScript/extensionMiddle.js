const {program} = require('commander')
const {removeSync, copySync} = require('fs-extra')
const {join, dirname} = require('path')
const dirFolder = dirname(__dirname) // 代表根目录
const {getBaseConfig, changBaseConfig} = require('./assetEvent')

const srcPath = join(dirFolder, '/src')
const templatePaht = join(dirFolder, '/template')
const tsConfigStorePath = join(templatePaht, '/tsconfig.json')
const tsConfigRootPath = join(dirFolder, '/tsconfig.json')

function changExtension(extension){
    let content = getBaseConfig()
    const reg = /main\.(js|ts)?/g
    // 获取入口文件
    let entryName = content.match(reg)[0]
    entryName = entryName.replace(reg, `main.${extension}`)
    changBaseConfig(content.replace(reg, entryName))
}

module.exports = (next)=>(argv)=>{
    const {extension} = argv
    // 更改 入口 扩展名
    changExtension(extension)
    // 删除 原src文件夹
    removeSync(srcPath)
    // 删除 tsconfig
    removeSync(tsConfigRootPath)
    // 获取模板文件夹路径
    const copyFloder = join(templatePaht, `/${extension}`)
    // 将模板文件夹 内容 进行复制
    copySync(copyFloder, srcPath)
    // 如果是ts 将模板文件夹内的 tsconfig.json 移动 至 根目录
    if(extension === 'ts'){
        copySync(tsConfigStorePath, tsConfigRootPath)
    }
    next(argv)
}