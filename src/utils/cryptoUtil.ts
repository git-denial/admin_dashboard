import crypto from 'crypto'

function generateSalt() {
    return crypto.randomBytes(20).toString('hex')
}

function hashSHA1(str: string) {
    return crypto.createHash('sha1').update(str).digest('hex')
}

function hashPasswordWithSalt(password:string, salt:string) {
    return hashSHA1(password+salt)
}

function generateRandomString(n:number) {
    return crypto.randomBytes(n).toString('base64')
}



export default{
    generateSalt,
    hashSHA1,
    hashPasswordWithSalt,
    generateRandomString
}