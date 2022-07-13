import sha1 from 'sha1';
export function encryptPasswordSha1(password: string) {
    return sha1(password);
}