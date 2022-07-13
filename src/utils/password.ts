import sha1 from 'sha1';
export function encryptPassword(password: string) {
    return sha1(password);
}