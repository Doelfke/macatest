import React, { FunctionComponent, useContext } from 'react';

import ApiService from 'api/ApiService';
import Loading from 'core/Components/Loading';
import { PageTitle } from 'core/Components/DefaultLayout';
import ApiList from 'Apis/ApiList';


const ListApisPage: FunctionComponent<{}> = () => {
    useContext(PageTitle).updateTitle('Apis');

    const apis = ApiService.serverApi.useGetApis();

    return (
        <div>
            <Loading isLoading={apis.isLoading}>
                <ApiList apis={apis.data!} />
            </Loading>
        </div>
    );
};


export default ListApisPage;