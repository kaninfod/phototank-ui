import React from 'react';
import { connect } from "react-redux";
import Header from '../components/common/header';
import {
  newCatalog,
  getCatalogs,
  createCatalogs,
  importCatalog,
  
} from '../actions/actCatalog';
import { loadAlbums } from '../actions/actBucket';
import '../stylesheets/card';
import Catalog from '../components/catalogs/catalog';
import EditCatalog from '../components/catalogs/edit';
import NewCatalog from '../components/catalogs/new';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCatalogDialog from '../components/catalogs/newCatalogDialog';

@connect((store) => {
  return {
    catalogs: store.catalog.get('catalogs'),
    albums: store.catalog.get('albums'),
    catalog: store.catalog.get('catalog'),
    loading: store.catalog.get('loading'),
  };
})
class Catalogs extends React.Component {
  constructor(props) {
    super(props);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    // this.createCatalog = this.createCatalog.bind(this);
    // this.verifyDropboxCatalog = this.verifyDropboxCatalog.bind(this);
    // this.updateCatalog = this.updateCatalog.bind(this);
    this.importToCatalog = this.importToCatalog.bind(this);
    this.getCatalogs = this.getCatalogs.bind(this);
    this.setRenderMode = this.setRenderMode.bind(this);
    this.openNew = this.openNew.bind(this);

    this.state = {
      showNew: false,
      showEdit: false,
      renderMode: 'list',
    };
  }

  componentWillMount() {
    this.props.dispatch(getCatalogs());
    // this.props.dispatch(loadAlbums());
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

  setRenderMode(mode) {
    this.setState({ renderMode: mode })
  }

  getCatalogs() {
    this.props.dispatch(getCatalogs())
  }

  openNew() {
    this.props.dispatch(newCatalog())
    this.setState({ renderMode: 'new' })
  }

  submitEdit() {

  }

  render() {

    const menuActions = {
      importToCatalog: this.importToCatalog,
      openEdit:        this.openEdit,
      submitEdit:      this.submitEdit,
    }

    let content = null
    if (this.state.renderMode == 'new') {
      content = <NewCatalog
        setRenderMode={this.setRenderMode}
        />;
    } else {
      content = <CatalogList catalogs={this.props.catalogs} menuActions={menuActions}/>;
    }

    return (
      <div>
        {content}
        <FloatingActionButton onClick={this.openNew} class="fab">
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function CatalogList(props) {
  return (
    <div>
      {props.catalogs.map(catalog => {
        return <Catalog
          id={catalog.get('id')}
          key={catalog.get('id')}
          catalog={catalog}
          importToCatalog={props.menuActions.importToCatalog}
          openEdit={props.menuActions.openEdit}
          submitEdit={props.menuActions.submitEdit}
          />
          }
        )
      }

    </div>
  );
}

export default Catalogs;
