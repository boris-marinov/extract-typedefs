const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const _ = require('lodash')

const indentTemplate = '    '

const indent = (number) => _.range(number).map(()=>indentTemplate).join('')
    
const typeExtractor = (metadata) => (object) => 
    Object.keys(object).reduce((types, typeName) => 
            types.concat(generateType(typeName, object[typeName], metadata)), metadata.header)

exports.flow = typeExtractor({
    header: '//@flow\n', 
    keyword: 'export type', 
    beginBrace: '{|',
    endBrace: '|}',
    separator: ', ',
    eq: ' = '
})

exports.ts = typeExtractor({
    header: '',
    keyword: 'interface',
    beginBrace: '{',
    endBrace: '}',
    separator: '; ',
    eq: ' '
})

const generateType = (name, sampleValue, metadata) => 
    `${metadata.keyword} ${capitalize(name)}${metadata.eq}${typeOfValue(sampleValue, 0, metadata)} \n`

const typeOfValue = (value, indent, metadata) => {
    if (value == null) {
        return 'any'
    } else if (typeof value !== 'object') {
        return typeof value
    } else {
        if (Array.isArray(value)) {
            return  `Array<${typeOfValue(value[0], indent, metadata)}>`
        } else {
            return typeOfObject(value, indent + 1, metadata)
        }
    }
}

const typeOfObject = (object, indentSize, metadata) =>  
    metadata.beginBrace + '\n' + 
    Object.keys(object).reduce((type, key) => 
            type.concat(indent(indentSize + 1) + 
            key + 
            ': ' + 
            typeOfValue(object[key], indentSize, metadata) + 
            metadata.separator + ' \n'), '') + indent(indentSize) + metadata.endBrace
