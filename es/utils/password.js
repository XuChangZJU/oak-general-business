import sha1 from 'sha1';
export function encryptPasswordSha1(password) {
    return sha1(password);
}
