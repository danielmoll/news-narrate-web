import React from 'react';
import Sticky from 'react-sticky';
import _ from 'lodash';

import menuItemData from '../data/menu_items'


class MenuItem extends React.Component {
    render() {
        var href = '#/' + this.props.data.href,
            classes = 'header-nav__link' + (this.props.activeItem ? ' selected' : '');

        return <a href={href} className={classes}>{this.props.data.label}</a>
    }
}

class Menu extends React.Component {
    handleActiveItem(itemData, route) {
        return itemData.href === route.slice(1);
    }

    render() {
        var activeItem,

            buttons = _.map(menuItemData, function (menuItem) {
                activeItem = this.handleActiveItem(menuItem, this.props.data);

                return <MenuItem data={menuItem} activeItem={activeItem} key={menuItem.key} />
            }.bind(this));

        return <Sticky stickyClass="header-nav--sticky"><nav className="cf header-nav">{buttons}</nav></Sticky>
    }
}

export default Menu;
