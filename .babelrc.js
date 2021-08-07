const presets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            useBuiltIns: 'usage',
            corejs: { version: "3.14", proposals: true },
            exclude: ['proposal-dynamic-import']
        }
    ],
    [
        '@babel/preset-react',
        {
            runtime: 'automatic'
        }
    ]
]
const plugins = [
    "react-hot-loader/babel",
    [
        'transform-react-remove-prop-types', 
        {
            mode: 'remove',
            removeImport: true
        }
    ],
    [
        'import',
        {
            "libraryName": "antd",
            "style": 'css'
        }
    ],
    [
        'transform-imports',
        {
            'lodash': {
                'transform': 'lodash/${member}',
                preventFullImport: true
            }
        }
    ]
]

module.exports = {
    presets,
    plugins
}