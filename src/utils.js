// function to cut down the description length a bit
const CutString = (toBeTruncated, desiredLength) => {
    let length = desiredLength;
    if (toBeTruncated !== null) {
        let trimmedStr = toBeTruncated.substring(0, length);
        if(trimmedStr.length === desiredLength) {
            trimmedStr += '...';
        }
    
        return trimmedStr;
    }
}

export default CutString;

const trimEmail = (s) => {
    // split up characters in string
    const emailArr = s.split("");

    // remove after certain character
    emailArr.splice(emailArr.indexOf('@'));

    // turn back into a string
    const cutStr = emailArr.join("")

    return cutStr
}

export { trimEmail };