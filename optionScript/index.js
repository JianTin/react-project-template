/**
 * 该文件 为 程序命令文件，将由 cli程序调用
 *  或者 执行 node optionScript/index.js extension bool
 * 例 node optionScript/index.js ts false
*/
const extensionMiddle = require('./extensionMiddle')
const compatibleIeMiddle = require('./ieMiddle')

const argv = process.argv.slice(2)
const keyArray = ['extension', 'IE']
// 遍历成我需要的对象，方便内部中间件获取
const argvObj = argv.reduce((prev, item, index)=>{
    const key = keyArray[index]
    prev[key] = item
    return prev
}, {})

// 套娃 fn1(fn2(fn))
const mergeMiddleware = [extensionMiddle, compatibleIeMiddle].reduceRight(
    (prev, item)=> item(prev), 
    ()=>{} // 空函数，最后一步 要做什么
)
mergeMiddleware(argvObj)