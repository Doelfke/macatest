import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import MainNav, { SecondaryNav } from 'core/MainNav/Navigation';
import Icon from 'core/Components/Icon/Icon';
import { NavigationService } from 'core/Services/NavigationService';


import classes from './DefaultLayout.module.scss';
import If from 'core/Components/If';
import { Color } from '../../Color';


interface Props extends PropsWithChildren<{}> { }


const PageTitle = React.createContext({
    pageTitle: { title: '', isInHeader: false },
    updateTitle: (title: string, isInHeader: boolean = false) => { return; }
});


const DefaultLayout: FunctionComponent<Props> = (props: Props) => {
    const [pageTitle, updateTitle] = useState({ title: '', isInHeader: false });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const updateTitleForPage = (title: string, isInHeader: boolean = false) => {
        setTimeout(() => {
            if (pageTitle.title !== title) {
                updateTitle({ title, isInHeader });
            }
        });
    };

    return (
        <PageTitle.Provider value={{ pageTitle, updateTitle: updateTitleForPage }}>
            <div className={classes.pageContainer}>
                <div className={classes.logoContainer}>
                    <If show={!pageTitle.isInHeader}>
                        <div className={classes.hamburger}>
                            <Icon name="menu" color={Color.utility_black} size="lg" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </If>
                    <img src="/dog-header.png" alt="Dog logo here :)" className={pageTitle.isInHeader ? classes.logo : ''} />
                </div>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', textAlign: 'center', width: '100%', bottom: '18px', fontSize: '28px' }}>
                        {pageTitle.isInHeader && pageTitle.title}
                        <div style={{ position: 'absolute', top: 0, right: '22px', display: pageTitle.isInHeader ? '' : 'none' }}>
                            <Icon name="x" color={Color.utility_black} size="md" onClick={NavigationService.goBack} />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', height: '100%', boxShadow: pageTitle.isInHeader ? 'inset rgba(219, 225, 230, 0.6) 0 0 10px' : '' }}>
                    <div className={classes.navContainer + ' ' + (pageTitle.isInHeader ? classes.navContainerPageTitleInHeader : '') + ' ' + (isMenuOpen ? classes.navContainerOpen : '')} >
                        <MainNav closeMenu={() => { setIsMenuOpen(false); return true; }} />
                    </div>
                    <div className={classes.contentContainerChrome + ' ' + (pageTitle.isInHeader ? classes.contentContainerChromeInheader : '')}>

                        <div className={classes.contentContainer}>
                            <If show={!pageTitle.isInHeader}>
                                <SecondaryNav />
                            </If>
                            <div className={classes.pageTitle}>
                                {!pageTitle.isInHeader && pageTitle.title}
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </PageTitle.Provider>
    );
};

export default DefaultLayout;

export { PageTitle };