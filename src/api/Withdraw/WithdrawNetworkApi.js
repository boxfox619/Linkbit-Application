import {fetch} from "react-native"
import {HOST} from "../../libs/Constraints"

const WITHDRAW_CACHE_KEY = 'withdraw'

export default class WalletNetworkApi {
    withdraw = async (wallet, password, amount, targetAddress) => {
        const res = await fetch(`${HOST}/withdraw`, {
            method: 'POST',
            headers: {
                'Authorization': '',
            },
            body: JSON.stringify({
                wallet,
                password,
                amount,
                target: targetAddress
            }),
        });
        return res;
    }

    saveWithdraw = async (wallet, password, amount, targetAddress) => {
        const data = JSON.stringify({
            wallet,
            password,
            amount,
            target: targetAddress
        })
        const withdrawList = JSON.parse(await AsyncStorage.getItem(WITHDRAW_CACHE_KEY) || '[]')
        withdrawList.push(data)
        await AsyncStorage.setItem(WITHDRAW_CACHE_KEY, JSON.stringify(withdrawList))
    }

    sendSavedWithdraw = async () => {
        const withdrawList = JSON.parse(AsyncStorage.getItem(WITHDRAW_CACHE_KEY) || '[]')
        const results = []
        for (data in withdrawList) {
            try {
                const res = await fetch(`${HOST}/withdraw`, {
                    method: 'POST',
                    headers: {
                        'Authorization': '',
                    },
                    body: data,
                });
                results.push(res)
            } catch (e) {
                const withdrawData = JSON.parse(data)
                results.push({ e, withdrawData })
            }
        }
        await AsyncStorage.setItem(WITHDRAW_CACHE_KEY, [])
        return results
    }
}