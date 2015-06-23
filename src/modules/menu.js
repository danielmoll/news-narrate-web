import React from 'react';
import _ from 'lodash';

import menuItemData from '../data/menu_items'


class MenuItem extends React.Component {
    render() {
        var style = {margin: '10px', 'padding': '10px'};
        var href = '#/' + this.props.data.href;
        return <a style={style} href={href}>{this.props.data.label}</a>
    }

}

class Menu extends React.Component {
    render() {
        var buttons = _.map(menuItemData, function (menuItem) {
            return <MenuItem data={menuItem}/>
        });
        return <nav>{buttons}</nav>
    }
}

export default Menu;
