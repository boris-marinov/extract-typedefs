//@flow
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const _ = require('lodash')

const indentTemplate = '    '

const indent = (number) => _.range(number).map(()=>indentTemplate).join('')
    
module.exports = (object /*: Object*/) => 
    Object.keys(object).reduce((types, typeName) => 
            types.concat(generateType(typeName, object[typeName])), '//@flow\n')

const generateType = (name, sampleValue) => `export type ${capitalize(name)} = ${typeOfValue(sampleValue, 0)} \n`

const typeOfValue = (value, indent) => {
    if (value == null) {
        return 'any'
    } else if (typeof value !== 'object') {
        return typeof value
    } else {
        if (Array.isArray(value)) {
            return  `Array<${typeOfValue(value[0], indent)}>`
        } else {
            return typeOfObject(value, indent + 1)
        }
    }
}

const typeOfObject = (object, indentSize) =>  
    '{|\n' + 
    Object.keys(object).reduce((type, key) => 
            type.concat(indent(indentSize + 1) + key + ': ?' + typeOfValue(object[key], indentSize) + ', \n'), '') + 
    indent(indentSize) + '|}'
   

