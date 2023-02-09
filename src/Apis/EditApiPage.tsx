import React, { FunctionComponent, useContext } from 'react';
import { withRouter, WithRouterProps } from 'react-router';


import { PageTitle } from 'core/Components/DefaultLayout';
import AddEditApi from 'Apis/AddEditApi';
import ApiService from 'api/ApiService';
import Loading from 'core/Components/Loading';

interface Props extends WithRouterProps { }

const EditApiPage: FunctionComponent<Props> = (props: Props) => {
    useContext(PageTitle).updateTitle('Edit Api', true);

    const apiId = parseInt(props.params.apiId);
    const api = ApiService.serverApi.useGetApi(apiId)();

    return (
        <Loading isLoading={api.isLoading}>
            <AddEditApi api={api.data!} />
        </Loading>
    );
};


export default withRouter(EditApiPage);