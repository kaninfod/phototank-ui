import React from 'react';
import { connect } from "react-redux";
import Header from '../components/common/header';
import { getCatalogs, createCatalogs, verifyDropboxCatalog, updateCatalog, importCatalog } from '../actions/actCatalog'
import { loadAlbums } from '../actions/actBucket';
import '../stylesheets/card'
import Catalog from '../components/catalogs/catalog';
import EditCatalog from '../components/catalogs/edit';
import NewCatalog from '../components/catalogs/new';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCatalogDialog from '../components/catalogs/newCatalogDialog'


@connect((store) => {
  return {
    catalogs: store.catalog.get('catalogs'),
    albums: store.catalog.get('albums'),
    authUrl: store.catalog.get('authUrl'),
    catalog: store.catalog.get('catalog'),
  };
})
class Catalogs extends React.Component {
  constructor(props) {
    super(props);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.openNew = this.openNew.bind(this);
    this.createCatalog = this.createCatalog.bind(this);
    this.verifyDropboxCatalog = this.verifyDropboxCatalog.bind(this);
    this.updateCatalog = this.updateCatalog.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.getCatalogs = this.getCatalogs.bind(this);
    this.closeNew = this.closeNew.bind(this);

    this.state = {
      showNew: false,
      showEdit: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(getCatalogs());
    this.props.dispatch(loadAlbums());
  }

  importToCatalog(catalog) {
    console.log('LETS IMPORT SOME SHIT', catalog);
    this.props.dispatch(importCatalog({id: catalog.get('id')}))
  }

  openEdit(catalog) {
    this.setState({ showEdit: true, catalog: catalog })
  }

  closeEdit(e) {
    this.setState({ showEdit: false, catalog: null })
  }

  openNew() {
    this.setState({ showNew: true, stepIndex: 0, })
  }

  createCatalog(payload) {
    this.props.dispatch(createCatalogs(payload))
  }

  verifyDropboxCatalog(payload) {
    this.props.dispatch(verifyDropboxCatalog(payload))
  }

  updateCatalog(payload) {
    this.props.dispatch(updateCatalog(payload))
  }

  getCatalogs() {
    this.props.dispatch(getCatalogs())
  }

  closeNew() {
    this.setState({ showNew: false})
  }



  submitEdit() {

  }

  render() {
    const actionsEdit = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeEdit}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.closeEdit}
      />,
    ];

    return (
      <div>
        {this.props.catalogs.map(catalog => {
          return <Catalog
            id={catalog.get('id')}
            key={catalog.get('id')}
            catalog={catalog}
            importToCatalog={this.importToCatalog}
            openEdit={this.openEdit}
            submitEdit={this.submitEdit}
            />
        })}

        <FloatingActionButton onClick={this.openNew} class="fab">
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Dialog With Actions"
          actions={actionsEdit}
          modal={true}
          open={this.state.showEdit}
          typeChange={this.typeChange}>
          <EditCatalog catalog={this.state.catalog} catalogs={this.props.catalogs}/>
        </Dialog>

        <NewCatalogDialog
          open={this.state.showNew}
          onClose={this.closeNew}
          createCatalog={this.createCatalog}
          verifyDropboxCatalog={this.verifyDropboxCatalog}
          updateCatalog={this.updateCatalog}
          getCatalogs={this.getCatalogs}
          catalog={this.props.catalog}
          catalogs={this.props.catalogs}
          >
        </NewCatalogDialog>
      </div>
    );
  }
}

export default Catalogs;
