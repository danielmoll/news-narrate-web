import React from 'react';
import _ from 'lodash';

import menuItemData from '../data/menu_items'


class MenuItem extends React.Component {
    render() {
        var href = '#/' + this.props.data.href;
        return <a href={href}>{this.props.data.label}</a>
    }
}

class Menu extends React.Component {
    render() {

        var buttons = _.map(menuItemData, function (menuItem) {
            return <MenuItem data={menuItem}/>
        });
        return <nav className="header-nav">{buttons}</nav>
    }
}

export default Menu;
