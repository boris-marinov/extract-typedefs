//@flow
export type Person = {|
        id: number,
        name: string,
        age: number,
        parents: Array<{|
            name: string,
            age: number,
        |}>,
    |}
export type Relation = {|
        r1: number,
        r2: number,
        relationType: string,
    |}

//TS
interface Person {
        id: number;
        name: string;
        age: number;
        parents: Array<{
            name: string;
            age: number;
        }>;
    }
interface Relation {
        r1: number;
        r2: number;
        relationType: string;
    }

