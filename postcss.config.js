const {join} = require('path')
const postcss = require('postcss')
const updateRule = require('postcss-sprites/lib/core').updateRule
var revHash = require('rev-hash');

module.exports = {
    plugins: [
        [
            // 动态精灵图
            'postcss-sprites',
            {
                spritePath: './dist/assets',
                filterBy: function({path}){
                    console.log(path)
                    const boolean = (new RegExp(/[\\/]icon[\\/]/)).test(path)
                    return boolean ? Promise.resolve() : Promise.reject() 
                },
                hooks: {
                    onUpdateRule: function(rule, token, image) {
                        // Use built-in logic for background-image & background-position
                        updateRule(rule, token, image);
                        ['width', 'height'].forEach(function(prop) {
                            var value = image.coords[prop];
                            if (image.retina) {
                                value /= image.ratio;
                            }
                            rule.insertAfter(rule.last, postcss.decl({
                                prop: prop,
                                value: value + 'px'
                            }));
                        });
                    },
                    onSaveSpritesheet: function(opts, spritesheet) {
                        return join(
                            opts.spritePath,
                            spritesheet.groups.concat([
                                revHash(spritesheet.image),
                                spritesheet.extension
                            ]).join('.')
                        );
                    }
                }
            }
        ],
        'postcss-preset-env',
        ['cssnano', {
            preset: 'default'
        }],
    ]
}