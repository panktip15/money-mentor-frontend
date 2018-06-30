import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import BudgetSetup from './BudgetSetup';
import EditCategories from './EditCategories';
import Home from '../Home';
import { styles, colorTheme } from '../../common/styles';

class Budget extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium }
  };
  render() {
    return (
      <View>
        <Text>Budget Page</Text>
        <Button
          raised
          buttonStyle={styles.orangebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Edit Budget`}
          onPress={() => {
            this.props.navigation.navigate('BudgetSetup', {
              title: 'BudgetSetup'
            });
          }}
        />
        <Button
          raised
          buttonStyle={styles.orangebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Edit Categories`}
          onPress={() => {
            this.props.navigation.navigate('EditCategories', {
              title: 'EditCategories'
            });
          }}
        />
      </View>
    );
  }
}

export default Budget;

export const BudgetStack = createStackNavigator({
  Budget: { screen: Budget },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
  Home: { screen: Home }
});
