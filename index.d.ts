type Definitions = {[name: string] : any; }

declare module 'extract-typedefs' {
    export function ts(val: Definitions ):string
    export function flow(val : Definitions):string
}
