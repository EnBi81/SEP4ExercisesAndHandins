import {caesarCipher} from "./caesarCipher";

it('Caesar Cipher "defend the east wall of the castle" by 1', () => {
    let cipher = caesarCipher('defend the east wall of the castle', 1);
    expect(cipher).toBe('efgfoe uif fbtu xbmm pg uif dbtumf');
})


it('Caesar Cipher "" by 2', () => {
    let cipher = caesarCipher('', );
    expect(cipher).toBe('');
})


it('Caesar Cipher "abcdefghijklmnopqrstuvwxyz" by 1', () => {
    let cipher = caesarCipher('abcdefghijklmnopqrstuvwxyz', 1);
    expect(cipher).toBe('bcdefghijklmnopqrstuvwxyza');
})

it('Caesar Cipher "abcdefghijklmnopqrstuvwxyz" by 2', () => {
    let cipher = caesarCipher('abcdefghijklmnopqrstuvwxyz', 2);
    expect(cipher).toBe('cdefghijklmnopqrstuvwxyzab');
})

it('Caesar Cipher "abcdefghijklmnopqrstuvwxyz" by 3', () => {
    let cipher = caesarCipher('abcdefghijklmnopqrstuvwxyz', 3);
    expect(cipher).toBe('defghijklmnopqrstuvwxyzabc');
})

it('Caesar Cipher "abcdefghijklmnopqrstuvwxyz" by 27', () => {
    let cipher = caesarCipher('abcdefghijklmnopqrstuvwxyz', 27);
    expect(cipher).toBe('bcdefghijklmnopqrstuvwxyza');
})