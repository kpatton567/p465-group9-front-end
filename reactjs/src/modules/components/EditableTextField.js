import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 50
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    color: "black",
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    }
  },
  btnIcons: {
    marginLeft: 10
  }
});

class EditableTextField extends React.Component {

  state = {
    email: "johndoe@domain.com",
    editMode: false,
    mouseEnter: false
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

  handleMouseEnter = event => {
      if (!this.state.mouseEnter) {
      this.setState({  mouseEnter: true });
    }
  };

  handleMouseLeave = event => {
    if (this.state.mouseEnter) {
      this.setState({ mouseEnter: false });
    }
  };

  handleClick = () => {
    this.setState({
      editMode: true,
      mouseEnter: false
    });
  };

  render() {
    const { classes, value } = this.props;
    console.log(this.props.email);
    
    return (
      <div className={classes.container}>
           <TextField
          name="firstname"
          defaultValue={this.props.email}
          margin="normal"
          error={this.state.email === ""}
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          className={classes.textField}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          InputProps={{
              classes: {
                  disabled: classes.disabled
              },
              endAdornment:
                  this.state.mouseEnter ?
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClick}><Edit /></IconButton>
                  </InputAdornment>
                    :
                  ""
          }}
          />
           <TextField
          name="email"
          defaultValue={this.props.email}
          margin="normal"
          error={this.state.email === ""}
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          className={classes.textField}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          InputProps={{
              classes: {
                  disabled: classes.disabled
              },
              endAdornment:
                  this.state.mouseEnter ?
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClick}><Edit /></IconButton>
                  </InputAdornment>
                    :
                  ""
          }}
          />
          <TextField
          name="email"
          defaultValue={this.props.email}
          margin="normal"
          error={this.state.email === ""}
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          className={classes.textField}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          InputProps={{
              classes: {
                  disabled: classes.disabled
              },
              endAdornment:
                  this.state.mouseEnter ?
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClick}><Edit /></IconButton>
                  </InputAdornment>
                    :
                  ""
          }}
          />
           <TextField
          name="mobile"
          margin="normal"
          error={this.state.email === ""}
          onChange={this.handleChange}
          disabled={!this.state.editMode}
          className={classes.textField}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          InputProps={{
              classes: {
                  disabled: classes.disabled
              },
              endAdornment:
                  this.state.mouseEnter ?
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClick}><Edit /></IconButton>
                  </InputAdornment>
                    :
                  ""
          }}
          />
      </div>
    );
  }
}

export default withStyles(styles)(EditableTextField);