import { createStackNavigator, createAppContainer } from 'react-navigation'
import MainTabView from './main'

const Navigator = createStackNavigator({
    Main: MainTabView,
},
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            headerStyle: {
                // marginTop: 5,
                // marginLeft: 5,
                backgroundColor: '#fff',
                border: 0,
                // ios
                borderBottomWidth: 0,
                // android
                elevation: 0,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    },
)

export default createAppContainer(Navigator)