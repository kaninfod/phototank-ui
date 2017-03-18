import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

class NewCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.handleVerifier = this.handleVerifier.bind(this);
    this.handleCatalogChange = this.handleCatalogChange.bind(this);
    this.state = {
      finished: false,
      stepIndex: 0,
      catalog: null,
      name: '',
      verifier: '',
    };
  }

  componentWillReceiveProps(next) {
    this.setState({
      stepIndex: next.stepIndex,
      finished: next.finished,
    });
  }

  handleName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleVerifier(e) {
    this.setState({
      verifier: e.target.value,
    });
  }

  handleCatalogChange(event, index, value) {
    const { catalogCheckbox, albumCheckbox } = this.state;
    this.setState({
      catalog: value,
    });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: {
        return (
          <TextField
            key="0"
            onChange={this.handleName}
            defaultValue={this.state.name}
            floatingLabelText="Catalog Name"
           />
        );
      }

      case 1: {
        return (
          <div>
            <p>
              Goto <a target="_blank" href={this.props.catalog.getIn(['ext_store_data', 'auth_url'])}>Dropbox</a> to
              authorize access to your Dropbox account.
              Enter the verifier code below:
            </p>
            <TextField
              key="1"
              onChange={this.handleVerifier}
              defaultValue={this.state.verifier}
              floatingLabelText="Dropbox verifier code"
             />
         </div>
        );
      }

      case 2: {
        const { catalogCheckbox, albumCheckbox } = this.state;
        return (
          <div>
            <SelectField
              floatingLabelText="Synchronise from catalog"
              value={this.state.catalog}
              onChange={this.handleCatalogChange}>
              {this.props.catalogs.map(cat => {
                return <MenuItem key={cat.get('id')} value={cat.get('id')} primaryText={cat.get('name')} />;
              })}
              </SelectField>
            </div>
        );
      }
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={ { width: '100%', maxWidth: 700, margin: 'auto' } }>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Enter name</StepLabel>
          </Step>
          <Step>
            <StepLabel>Approve Dropbox access</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add catalog</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {stepIndex == 3 ? (
            <p>
              Finished!
              Your catalog was successfully added to Dropbox
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={ { marginTop: 12 } }>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NewCatalog;
