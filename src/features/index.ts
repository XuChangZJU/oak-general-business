import { Token } from './token';

export function initialize() {
    const token = new Token();
    return {
        token,
    };
}
