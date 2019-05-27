import crypto from 'crypto';
import ECIES from 'eth-ecies';
import * as ethUtil from 'ethereumjs-util';

describe('address network api', () => {
    const privateKey = crypto.randomBytes(32);
    const publicKey = ethUtil.privateToPublic(privateKey);

    it('should support ECIES', () => {
        const randomText = crypto.randomBytes(30).toString('hex')
        const encrypted = ECIES.encrypt(publicKey, randomText).toString('hex')
        const decrpyted = ECIES.decrypt(privateKey, Buffer.from(encrypted, 'hex')).toString();
        expect(decrpyted).toBe(randomText)
    });
})