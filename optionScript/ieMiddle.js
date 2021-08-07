const {getBaseConfig, changBaseConfig} = require('./assetEvent')

module.exports = (next)=>(argv)=>{
    const {IE: bool} = argv
    const baseContent = getBaseConfig()
    // 匹配 depenOn的数组，为其添加 babel-profill
    // 匹配 ['fn1', 'fn2'] [].length>=2
    const reg = new RegExp(/(\[?'(\w|@|-|\/)*'(,\s|\])){2,100}/g)
    // string ['fn1', 'fn2']
    let denpenString = baseContent.match(reg)[0]

    // 删除 / 添加
    if(bool === 'false' && denpenString.includes('babel-polyfill')) {
        denpenString = denpenString.replace("'babel-polyfill', ", '')
    }
    // 添加
    if(bool === 'true' && !denpenString.includes('babel-polyfill')){
        denpenString = denpenString.replace(/\[/, "['babel-polyfill', ")
    }
    changBaseConfig(baseContent.replace(reg, denpenString))
    next(argv)
}
