import React from "react";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../common/styles";
import {
  Text,
  View,
  Switch,
  Animated,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Button } from "react-native-elements";
import { transactionIconType } from "../../common/index";
import { connect } from "react-redux";
import { updateTrans, fetchAcctTransData } from "../../store";
import Picker from './Picker'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    this.state = {
      expanded: false,
      included: props.transaction.included,
      category: props.transaction.category1,
      modal: false,
      offSet: new Animated.Value(deviceHeight)
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.includedToggle = this.includedToggle.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  toggleInfo() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  handleCategoryChange(category) {
    this.setState({
      category
    });
  }

  async includedToggle(boolean) {
    await this.setState({
      included: !this.state.included
    });
    await this.props.updateTrans({
      ...this.props.transaction,
      included: this.state.included,
      category: this.state.category
    });
  }

  render() {
    const icons = {
      up: "chevron-up",
      down: "chevron-down"
    };

    let icon = icons.down;

    if (this.state.expanded) {
      icon = icons.up;
    } else {
      icon = icons.down;
    }

    const transaction = this.props.transaction;

    const info = (
      <View style={styles.transBody}>
        <View>
          <Text style={{ fontWeight: "bold" }}> Date: </Text>
          <Text>{transaction.date}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}> Category: </Text>
          <Text>{transaction.category1}</Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={
              this.toggleModal}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableHighlight>

          {this.state.modal && (
            <Picker
              toggleModal={this.toggleModal}
              offSet={this.state.offSet}
              handleCategoryChange={this.handleCategoryChange}
              category={this.state.category}
            />
          )}

          <View>
            <Text style={{ fontWeight: "bold" }}> Included in Budget: </Text>
            <Switch
              value={this.state.included}
              onValueChange={this.includedToggle}
            />
          </View>
        </View>
      </View>
    );

    return (
      <View>
        <ListItem
          key={transaction.id}
          title={transaction.name}
          subtitle={transaction.categoty1}
          rightTitle={`$ ${transaction.amount}`}
          onPress={() => this.toggleInfo()}
          rightIcon={<Icon name={icon} />}
          leftIcon={{
            name: transactionIconType[transaction.category2]
          }}
        />

        {this.state.expanded && info}
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    updateTrans: trans => dispatch(updateTrans(trans)),
    fetchAcctTransData: () => dispatch(fetchAcctTransData())
  };
};

export default connect(
  null,
  mapDispatch
)(Transaction);
