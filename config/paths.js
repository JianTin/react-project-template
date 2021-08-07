const {join, dirname} = require('path')
const dir = dirname(__dirname)
const distFolderName = '/dist'
const publicFolderName = '/public'

module.exports = {
    join,
    dir,
    distFolderName,
    publicFolderName
}