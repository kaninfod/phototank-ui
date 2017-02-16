import React from 'react';
import {Header} from './header.jsx'

var infoItemProps = function(props){
  return (
    [{key: 1, label: 'ID',      info: props.photo.id},
    {key: 2, label: 'Date',     info: props.photo.date_taken},
    {key: 3, label: 'Address',  info: props.photo.location.address},
    {key: 4, label: 'Country',  info: props.photo.location.country},
    {key: 5, label: 'Model',    info: props.photo.model},
    {key: 6, label: 'Make',     info: props.photo.make}]
  )
}

var infoItem = function(props){
  return (
    <li key={props.key}>
      <label>{props.label}</label>
      <div className="content">{props.info}</div>
    </li>
  )
}

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const info = infoItemProps(this.props.photocard)
    return (
      <div className="pt-widget">
        <Header handleClose={this.props.widgetHandlers.HIDE} title="Photo Information"/>
        <div className="pt-widget content">
          <ul className="pt-info">
            {info.map(infoItem.bind(this))}
          </ul>
        </div>
      </div>
    )
  }
}
