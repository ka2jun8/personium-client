export declare const Encode: (original: string) => string;
export declare const Decode: (original: string) => string;
export interface Query {
    format?: string;
    expand?: string;
    select?: string;
    orderby?: string;
    top?: string;
    skip?: string;
    filter?: string[];
    inlinecount?: string;
    q?: string;
}
export declare const convertQueriedUrl: (url: string, query: Query) => string;
