import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
    return await hash(password, 12);
}

export async function verifyPassword(inputPassword: string, userPassword: string) {
    return await compare(inputPassword, userPassword);
}