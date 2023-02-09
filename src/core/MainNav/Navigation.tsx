import React, { FunctionComponent } from 'react';
import { Link, withRouter, WithRouterProps } from 'react-router';

import { AuthService } from 'core/Services/AuthService';
import LinkButton from 'core/Components/Button/LinkButton';

import classes from './Navigation.module.scss';


interface OuterProps {
    closeMenu: () => void;
}

interface Props extends WithRouterProps, OuterProps { }


const CATEGORIES = ['DOGS', 'API'];

const LINKS = [
    { title: 'Dogs', url: '/dogs', requiredRoles: [], category: 'DOGS', subLinks: [] },
    { title: 'Apis', url: '/apis', requiredRoles: [], category: 'API', subLinks: [] }
];

const MainNav: FunctionComponent<Props> = (props: Props) => {

    const linksWithCategories = CATEGORIES.map(c => {
        return {
            name: c,
            links: LINKS.filter(l => l.category === c)
        };
    }).filter(c => c.links.length);

    return <>
        {linksWithCategories.map(category => {
            const links = category.links.map(link => {
                const selectedClass = props.location.pathname.startsWith(link.url) ? classes.linkSelected : '';
                return <Link to={link.url} className={classes.link + ' ' + selectedClass} key={link.title} onClick={props.closeMenu}>{link.title}</Link>;
            });
            return (
                <div key={category.name} className={classes.category}>
                    {category.name}
                    {links}
                </div>
            );

        })}
        <LinkButton onClick={AuthService.logOut} className={classes.link + ' ' + classes.logout}>Logout</LinkButton>
    </>;
};

const SecondaryNav: FunctionComponent<Props> = (props: Props) => {

    const parentLink = LINKS.find(x => props.location.pathname.startsWith(x.url));

    if (!parentLink || !parentLink.subLinks) {
        return <></>;
    }

    const links = [parentLink, ...parentLink.subLinks];

    if (!links.length) {
        return <></>;
    }

    return (
        <div className={classes.secondaryContainer}>
            {links.map(link => {
                const selectedClass = props.location.pathname === link.url ? classes.secondaryLinkSelected : '';
                const className = classes.secondaryLink + ' ' + selectedClass;
                return (
                    <Link to={link.url} key={link.title} className={className}>{link.title}</Link>
                );
            })}
        </div>
    );
};

const secondaryNavWithRouter = withRouter<any>(SecondaryNav);

export {
    secondaryNavWithRouter as SecondaryNav
};


export default withRouter<OuterProps>(MainNav);