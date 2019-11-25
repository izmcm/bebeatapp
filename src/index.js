import Connect from './Connect';
import Record from './Record';
import Listen from './Listen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

const Routes = createAppContainer(
  createStackNavigator({
    Conectar: Connect,
    Gravar: Record,
    Ouvir: Listen,
  })
);

export default Routes;