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
};

export const toEscapeSequence = (original: string) => {
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