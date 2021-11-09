// 添加 移动端适配
const {getContent, writeContent, dirFolder} = require('../assetEvent')
const {join} = require('path')

const postCssPath = join(dirFolder, '/postcss.config.js')
const pluginReg = /\[(\w|\W)*\]/g

module.exports = (next)=>(state)=>{
    const {mobile} = state
    const content = getContent(postCssPath)
    if(mobile === 'false' || content.includes('postcss-px-to-viewport')) return
    // [config]
    const pluginConfigString = content.match(pluginReg)[0]
    // [mobile-plugin+config]
    let mobileContent = `
        [
            ['postcss-px-to-viewport', {
                viewportWidth: ${mobile}
            }], ${ pluginConfigString.slice(1)}
    `
    // 查找替换
    mobileContent = content.replace(pluginReg, mobileContent)
    // 添加
    writeContent(postCssPath, mobileContent)  
    next(state)
}