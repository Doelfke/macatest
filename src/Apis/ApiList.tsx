import React, { FunctionComponent } from 'react';

import Table, { TableColumn } from 'core/Components/Table/Table';
import TableTopper from 'core/Components/Table/TableTopper';
import { NavigationService } from 'core/Services/NavigationService';
import Icon from 'core/Components/Icon/Icon';
import { ApiDto } from 'server/dto/api.dto';
import Button from 'core/Components/Button/Button';
import { ServerSize } from 'apiEnums';
import { Color } from '../Color';


interface Props {
    apis: ApiDto[];
}


const ApiList: FunctionComponent<Props> = (props: Props) => {

    const columns: TableColumn[] = [
        {
            title: 'Name',
            key: 'name',
            sortable: true
        },
        {
            title: 'Instance Count',
            key: 'instanceCount',
            sortable: true
        },
        {
            title: 'Instance Size',
            key: 'instanceSize',
            sortable: true,
            render: (value: number, rowValue: ApiDto, index: number) => {
                return ServerSize[value];
            }
        },
        {
            title: 'Edit',
            key: 'id',
            align: 'center',
            width: '20px',
            render: (value: number, rowValue: ApiDto, index: number) => {
                const edit = () => { NavigationService.goTo('/api/' + value); };
                return <Icon name="edit" color={Color.primary_brand_blue} size="md" onClick={edit} />;
            }
        }
    ];

    return (
        <>
            <TableTopper
                left={<></>}
                right={<Button onClick={() => NavigationService.goTo('/api/add')}>Create Api +</Button>}
            />
            <Table columns={columns} data={props.apis} emptyText="No apis found" />
        </>
    );
};


export default ApiList;