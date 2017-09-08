const splitWord = (original: string) => {
    let index = 0;
    const result = [];
    while(index < original.length){
        result[index] = original.substring(index, index+1);
        index++;
    }
    return result;
};

const EscapeSequenceMap = {
    ":": "%3A",
    "/": "%2F",
    " ": "%20",
    "$": "%24",
    "\\": "%5C",
};

const reverseMap = (map) => {
    const result = {};
    Object.keys(map).forEach((key)=>{
        result[map[key]] = key;
    });
    return result;
};

export const Encode = (original: string) => {
    let resultArray = splitWord(original);
    resultArray = resultArray.map((character) => {
        if(EscapeSequenceMap[character]){
            return EscapeSequenceMap[character];
        }else {
            return character;
        }
    });
    const result = resultArray.join("");
    return result;
};

export const Decode = (original: string) => {
    let index = -2;
    const ReverseSequenceMap = reverseMap(EscapeSequenceMap);
    let sentence = original;
    while(index !== -1) {
        index = sentence.indexOf("%");
        if(index >= 0) {
            const target = sentence.substring(index, index+5);
            const before = sentence.substring(0, index);
            const after = sentence.substring(index+5);
            sentence = before + ReverseSequenceMap[target] + after;
        }
    }
    return sentence;
};

export interface Query {
    format?: string,
    expand?: string,
    select?: string,
    orderby?: string,
    top?: string,
    skip?: string,
    filter?: string[],
    inlinecount?: string,
    q?: string,
}

const AND = " and ";

export const convertQueriedUrl = (url: string, query: Query): string => {
    let result = url + "?";
    if(query.filter && query.filter.length > 0) {
        const filters = query.filter;
        result += Encode("$filter=");
        filters.forEach((filter)=>{
            result += Encode(filter);
            result += AND;
        });
        result = result.substring(0, result.indexOf(AND));
    }
    return result;
}

