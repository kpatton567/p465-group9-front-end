import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

  const listItem= {
    marginRight : theme.spacing(20)
  }

class Snacks extends Component {
    constructor(props) {
      super(props);
      this.state = { counter: 0, totalPrice: 0 }; 
    }

    handleIncrement = () => {
        const { price, increaseTotals, snackId } = this.props; 
        const newTotal = (this.state.counter + 1) * price;
        // this.setState({counter : this.state.counter + 1});
        this.setState({ counter: this.state.counter + 1, totalPrice: newTotal }, () => {
            increaseTotals(this.state.counter, snackId);
        });
    };

    handleDecrement = () => {
        const { price, decreaseTotals, snackId } = this.props; 
        const newTotal = (this.state.counter + 1) * price;
        if(this.state.counter > 0)
            this.setState({ counter: this.state.counter - 1, totalPrice: newTotal }, () => {
                decreaseTotals(this.state.counter);
        });
    };

    render() {
      const { name, price, snackId } = this.props;
      return (

        <div>
            <ListItem>
            <ListItemText style={listItem} primary={name} secondary={`$${price}`}>{name}</ListItemText>
            <ButtonGroup size="small" aria-label="small outlined button group">
                  <Button onClick={this.handleIncrement}>+</Button>
                  { <Button disabled style={{ textTransform: 'none' }} key={snackId}>{this.state.counter}</Button>}
                  { <Button onClick={this.handleDecrement}>-</Button>}
                  </ButtonGroup>
            </ListItem>
        </div>  
      );
    }
  }
  export default (Snacks);