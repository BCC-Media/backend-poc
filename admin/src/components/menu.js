// in src/Menu.js
import * as React from 'react';
import { DashboardMenuItem, MenuItemLink } from 'react-admin';
import { Book as BookIcon} from '@material-ui/icons';

export const Menu = () => (
    <div>
        <DashboardMenuItem />
        <MenuItemLink to="/media" primaryText="All" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/standalones" primaryText="Standalones" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/shows" primaryText="Shows" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/seasons" primaryText="Seasons" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/episodes" primaryText="Episodes" leftIcon={<BookIcon />}/>
        <MenuItemLink to="/categories" primaryText="Categories" leftIcon={<BookIcon />}/>
    </div>
);