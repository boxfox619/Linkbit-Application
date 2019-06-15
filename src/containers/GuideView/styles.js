import { StyleSheet, Dimensions } from 'react-native'

const getCardWidth = () => {
    const { height, width } = Dimensions.get('window')

    return width / 100 * 80
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 20,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: getCardWidth(),
        marginBottom: 80,
        borderRadius: 10,
        backgroundColor: '#e8a93a',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
    titleLabel: {
        fontSize: 20,
        marginBottom: 10,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    subLabel: {
        lineHeight: 20,
        color: '#ffffff',
        textAlign: 'center',
    },
    splash: {
        flex: 1,
        borderRadius: 10,
        marginVertical: 80,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
