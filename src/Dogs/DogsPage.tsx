import React, { FunctionComponent, useContext } from 'react';

import { PageTitle } from 'core/Components/DefaultLayout';
import Loading from 'core/Components/Loading';
import ApiService from 'api/ApiService';
import Dogs from './Dogs';


const DogsPage: FunctionComponent<{}> = () => {
    useContext(PageTitle).updateTitle('Dogs!');

    const apis = ApiService.dogsApi.useGetBreeds();
    
    return (
        <div>
            <Loading isLoading={apis.isLoading}>
                <Dogs breeds={apis.data}></Dogs>
            </Loading>
        </div>
    );
};


export default DogsPage;