# extract-typedefs
Extracts flow type definitions of sample JSON values.

##Usage
```javascript

//@flow

const extractTypedefs = require('./index.js')

//Create an object with sample values for your types
const sampleData/*: {person: Person, relation: Relation} */= {
    person: {
        id:10212,
        name:'John',
        age: 22,
        parents: [
            {
                name: 'Jane',
                age: 45,
            },
            {
                name: 'Tim',
                age: 45,
            }
        ]
    },
    relation: {
        r1:10210,
        r2:12102,
        relationType: 'Friends'
    }
}


//Save the input of this function in a file:
console.log(extractTypedefs(sampleData))

//Require the file
/*::
import type {Person, Relation} from './types.js'
*/


//Voala, typed JSON API:
const me /*:Person*/ = {
    id:111, 
    name:'Boris',
    age:'22', //Throws type error
    parents: []
}

```