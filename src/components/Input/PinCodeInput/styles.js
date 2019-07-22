import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  //passwordInputView
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    marginBottom: '20%',
  },
  pin: {
    width: '100%',
  },
  passwordInputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  passwordInputViewItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    margin: 15,
    width: 15,
    borderRadius: 15 / 2,
  },
  passwordInputViewItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    width: 15,
    margin: 15,
    borderRadius: 15 / 2,
  },
  // KeyboardView
  keyboardView: {
    alignItems: 'center',
    marginTop: 15,
  },
  keyboardViewItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 75 / 2,
  },
  keyboardViewItemText: {
    fontSize: 32,
  },
})
