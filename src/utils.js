// function to cut down the description length a bit
const CutString = (string, desiredLength) => {
    let length = desiredLength;
    if (string !== null) {
        let trimmedStr = string.substring(0, length);
        if(trimmedStr.length === desiredLength) {
            trimmedStr += '...';
        }
    
        return trimmedStr;
    }
}

export default CutString;