import crypto from 'crypto'
import ECIES from 'eth-ecies'
import * as ethUtil from 'ethereumjs-util'
import * as AddressApi from '../AddressNetworkApi'

describe('address network api', () => {
    const privateKey = crypto.randomBytes(32);
    const publicKey = ethUtil.privateToPublic(privateKey);

    it('should support ECIES', () => {
        const randomText = crypto.randomBytes(30).toString('hex')
        const encrypted = ECIES.encrypt(publicKey, randomText).toString('hex')
        const decrpyted = ECIES.decrypt(privateKey, Buffer.from(encrypted, 'hex')).toString()
        expect(decrpyted).toBe(randomText)
    });

    it('should workin well api', async () => {
        const data = await AddressApi.createToken(publicKey.toString('hex'))
        expect(data).toBeDefined()
        expect(data.token).toBeDefined();
        const decrypted = ECIES.decrypt(privateKey, Buffer.from(data.token, 'hex'));
        expect(decrypted).toBeDefined();
    });
})