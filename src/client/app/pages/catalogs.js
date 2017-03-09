import React from 'react';
import { connect } from "react-redux";
import Header from '../components/common/header';
import { getCatalogs } from '../actions/actCatalog'
import '../stylesheets/card'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

@connect((store) => {
  return {
    catalogs: store.catalog.get('catalogs'),
  };
})
class Catalogs extends React.Component {


  componentWillMount() {
    this.props.dispatch(getCatalogs());
  }


  render() {

    var catalogs = this.props.catalogs.map(cat => {return Catalog(cat)})

    return (
      <div>
        {catalogs}
      </div>
    );
  }
}

export default Catalogs;

const Catalog = (props) => {
  return (
    <div class="pt-card-catalog" key={props.get('id')}>
      <img src={props.get('url').concat('?token=', sessionStorage.jwt)}></img>
        <div class="title">
          <div class="alignleft">
            <p>{props.get('name')}</p>
            <p>{props.get('type')}</p>
          </div>


          <div class="alignright">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem primaryText="View photos" />
              <MenuItem primaryText="Edit" />
              <MenuItem primaryText="Jobs" />
              <MenuItem primaryText="Update" />
              <MenuItem primaryText="Stats" />
            </IconMenu>
          </div>
        </div>

    </div>
  )
}
