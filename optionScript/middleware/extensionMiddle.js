// 移动开发文件夹 和 修改 webpack.entry 入口
const {copyFileSync, rmSync, rmdirSync, readdirSync, mkdirSync, existsSync} = require('fs')
const {join} = require('path')
const {getContent, writeContent, dirFolder} = require('../assetEvent')

const srcPath = join(dirFolder, '/src')
const templatePaht = join(dirFolder, '/template')
// ts 处理
const tsConfigStorePath = join(templatePaht, '/tsconfig.json')
const tsConfigRootPath = join(dirFolder, '/tsconfig.json')
const typesEntry = join(templatePaht, '/typings')
const typesOutput = join(dirFolder, '/typings')

// 更改 extension 扩展名
function changExtension(extension){
    const assetsFile = join(dirFolder, '/config', '/assets.js')
    const content = getContent(assetsFile)
    const reg = /type(\s|\w|=|')+/
    const newContent = content.replace(reg, `type = '${extension}'`)
    writeContent(assetsFile, newContent)
}

// 复制源文件夹 -> 目标文件夹
// 只复制一层
function copyDir(src, target){
    // 判断 路径是否存在，不存在 创建 目录
    if(!existsSync(target)) mkdirSync(target)
    const srcFileName = readdirSync(src)
    const srcFilePathArray = srcFileName.map( path =>{
        return join(src, path)
    })
    const targetFilePathArray =  srcFileName.map( path =>{
        return join(target, path)
    })
    srcFilePathArray.forEach((srcPath, index)=>{
        copyFileSync(srcPath, targetFilePathArray[index])
    })
}

// 删除
function remove(path){
    // 不存在 返回
    if(!existsSync(path)) return
    // 递归目录删除 / 删除文件
    rmSync(path, {force: true, recursive: true})
    // 如果 还存在，那么是 空目录
    if(existsSync(path)) rmdirSync(path)
}

module.exports = (next)=>(argv)=>{
    const {extension} = argv
    // 更改 入口 扩展名
    changExtension(extension)
    // 删除 原src文件夹
    remove(srcPath)
    // 删除 tsconfig
    remove(tsConfigRootPath)
    // 获取模板文件夹路径
    const copyFloder = join(templatePaht, `/${extension}`)
    copyDir(copyFloder, srcPath)
    // copySync(copyFloder, srcPath)
    // 如果是ts 将模板文件夹内的 tsconfig.json 移动 至 根目录
    if(extension === 'ts'){
        copyFileSync(tsConfigStorePath, tsConfigRootPath)
        copyDir(typesEntry, typesOutput)
    }
    next(argv)
}