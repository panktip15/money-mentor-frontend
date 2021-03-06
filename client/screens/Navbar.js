import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from './Profile';
import { AccountStack } from './Accounts';
import { HomeStack } from './Home';
import { BudgetStack } from './Budget';
import { ProfileStack } from './Profile'
import { styles, colorTheme } from '../common/styles'

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const homeIcon = ({ tintColor }) => (
  <Icon name="home" size={25} color={tintColor} />
);
const budgetIcon = ({ tintColor }) => (
  <Icon name="dollar" size={25} color={tintColor} />
);
const accountsIcon = ({ tintColor }) => (
  <Icon name="university" size={25} color={tintColor} />
);
const profileIcon = ({ tintColor }) => (
  <Icon name="user" size={25} color={tintColor} />
);

const Navbar = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: homeIcon
      }
    },
    Budget: {
      screen: BudgetStack,
      navigationOptions: {
        tabBarIcon: budgetIcon
      }
    },
    Accounts: {
      screen: AccountStack,
      navigationOptions: {
        tabBarIcon: accountsIcon
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: profileIcon
      }
    }
  },
  {
    initialRouteName: 'Home',
    activeTintColor: '#efcdba',
    inactiveTintColor: '#FFFFFF',
    barStyle: { backgroundColor: colorTheme.blue.dark }
  }
);

export default Navbar;
