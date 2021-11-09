#!/usr/bin/env node

/**
 * 该文件 为 程序命令文件，将由 cli程序调用
 *  或者 执行 node optionScript/index.js extension bool bool|number
 * 例 node optionScript/index.js js false false
*/
const {extensionMiddle, ieModeMiddle, mobileMiddle} = require('./middleware')
const cleanFn = require('./cleanInitFloder')

const argv = process.argv.slice(2)
const keyArray = ['extension', 'IE', 'mobile']
// 遍历成我需要的对象，方便内部中间件获取
const argvObj = argv.reduce((prev, item, index)=>{
    const key = keyArray[index]
    prev[key] = item
    return prev
}, {})

// 套娃 fn1(fn2(fn))
const mergeMiddleware = [extensionMiddle, ieModeMiddle, mobileMiddle].reduceRight(
    (prev, item)=> item(prev), 
    cleanFn
)
mergeMiddleware(argvObj)