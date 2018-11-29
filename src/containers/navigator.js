import {createStackNavigator} from 'react-navigation';
import MainTabView from "./MainView/MainTabView";
import AddressListView from "./AddressView/AddressListView";

export default createStackNavigator({
        Main: MainTabView,
        Address: AddressListView
    },
    {
        initialRouteName: "Main"
    }
)