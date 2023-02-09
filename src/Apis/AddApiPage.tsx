import React, { FunctionComponent, useContext } from 'react';


import { PageTitle } from 'core/Components/DefaultLayout';
import AddEditApi from 'Apis/AddEditApi';


const AddApiPage: FunctionComponent<{}> = () => {
    useContext(PageTitle).updateTitle('Create Api', true);

    return (
        <AddEditApi />
    );
};


export default AddApiPage;