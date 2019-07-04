/** @format */
import 'proxy-polyfill'
import 'node-libs-react-native/globals'
import './globals'
import './axios-settings'

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

function observe(o, callback) {
    return new Proxy(o, {
        set(target, property, value) {
            callback(property, value);
            target[property] = value;
        },
    });
}

const x = { 'name': 'BB-8' };
const p = observe(x, (property, value) => console.warn(property, value));
p.name = 'BB-9';

AppRegistry.registerComponent(appName, () => App)