import React from 'react';
import { getCatalogs, updateCatalog } from '../../actions/actCatalog'
import '../../stylesheets/card'
import NewCatalog from './new';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
class NewCatalogDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.state = {
      open: false,
      catalog: null,
      stepIndex: 0,
      stepBack: true,
    };
  }

  componentWillReceiveProps(next) {
    var {stepIndex} = this.state;
    var state = {}
    const auth_url = !!next.catalog.getIn(['ext_store_data', 'auth_url'], false)
    const user_id = !!next.catalog.getIn(['ext_store_data', 'user_id'], false)
    const catalogId = !!next.catalog.getIn(['sync_from_catalog'], false)

    if (auth_url && stepIndex == 0) {
      state = { stepIndex: 1, stepBack: false }
    } else if (user_id && stepIndex == 1) {
      state = { stepIndex: 2, stepBack: false }
    } else if (catalogId && stepIndex == 2) {
      state = { stepIndex: 3, stepBack: true }
    } else if (stepIndex == 3) {
      state = { stepIndex: 0 }
    }

    this.setState(Object.assign(state, {open: next.open}))
  }

  handleNext = () => {
    var {stepIndex} = this.state;
    switch (stepIndex) {
      case 0: {
        var payload = {
          name: this.refs.catalog.state.name,
          type: 'DropboxCatalog',
        }
        this.props.createCatalog(payload)
        break;
      }

      case 1: {
        var payload = {
          id: this.props.catalog.get('id'),
          verifier: this.refs.catalog.state.verifier,
          type: 'DropboxCatalog',
        }
        this.props.verifyDropboxCatalog(payload)
        break;
      }

      case 2: {
        var payload = {
          id: this.props.catalog.get('id'),
          type: 'DropboxCatalog',
          sync_from_catalog_id: this.refs.catalog.state.catalog,
        }

        this.props.updateCatalog(payload);
        break;
      }

      case 3: {
        this.props.getCatalogs();
        this.props.onClose()
        this.setState({stepIndex: 0})
        break;
      }
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  render() {
    const actionsNew = [
      <FlatButton
        label="Previous"
        primary={true}
        disabled={this.state.stepIndex === 0 || !this.state.stepBack}
        onTouchTap={this.handlePrev}
      />,
      <FlatButton
        label={this.state.stepIndex == 3 ? 'Finish' : 'Next'}
        primary={true}
        disabled={false}
        onTouchTap={this.handleNext}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Add catalog"
          actions={actionsNew}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}>
          <NewCatalog
            ref="catalog"
            stepIndex={this.state.stepIndex}
            catalogs={this.props.catalogs}
            catalogChange={this.handleCatalogChange}
            dropboxAuthUrl={this.props.authUrl}
            catalog={this.props.catalog}
            />
        </Dialog>
      </div>
    );
  }
}

export default NewCatalogDialog;
