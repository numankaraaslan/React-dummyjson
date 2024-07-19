import CryptoJS from 'crypto-js'

export function encrypt(plainText : string) : string {
    const cypher = CryptoJS.AES.encrypt(plainText, process.env.REACT_APP_AESKEY!).toString();
    return cypher;
}

export function decrypt(cypherText : string) : string {
    const decypher = CryptoJS.AES.decrypt(cypherText, process.env.REACT_APP_AESKEY!);
    return decypher.toString(CryptoJS.enc.Utf8);
}