import { browserHistory } from "react-router";


const goBack = () => browserHistory.goBack();

const goTo = (url: string, force: boolean = false) => {
    // To break apollo caching, sometimes we need to force a URL change
    if (force) {
        window.location.href = url;
        return;
    }
    browserHistory.push(url);
};


export const NavigationService = {
    goBack,
    goTo
};

