import Connect from './Connect';
import Record from './Record';
import Listen from './Listen';
import BluetoothConnection from './BluetoothConnection';
import LiveRecord from './LiveRecord';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

const Routes = createAppContainer(
  createStackNavigator({
    Conectar: Connect,
    Gravar: Record,
    Ouvir: Listen,
    BluetoothConnection: BluetoothConnection,
    LiveRecord: LiveRecord,
  })
);

export default Routes;