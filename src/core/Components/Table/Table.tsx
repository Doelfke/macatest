import React, { useState } from 'react';
import { Table as AntTable } from 'antd';
import { ColumnType, TableCurrentDataSource } from 'antd/lib/table/interface';

import classes from './Table.module.scss';
import Icon from 'core/Components/Icon/Icon';
import { Color } from '../../../Color';


export interface TableColumn {
    title?: string;
    key?: string;
    align?: 'left' | 'right' | 'center';
    width?: string;
    render?: (value: any, rowValue: any, index: number) => React.ReactNode;
    hideBackground?: boolean;
    sortable?: boolean;
    pad?: boolean;
    hideMobile?: boolean;
    expandedRowRender?: (rowValue: any, rowIndex: number) => React.ReactNode;

}

export interface Props<T> {
    columns: TableColumn[];
    data?: {}[];
    emptyText: string;
    onRowDrag?: (oldRowIndex: number, newRowIndex: number) => void;
}


const Table = <T extends any>(props: Props<T>) => {

    const [state, setState] = useState({
        expandedRowKey: undefined as undefined | number,
        expandedCellKey: undefined as undefined | string,

        draggingRowIndex: undefined as undefined | number,
        droppingRowIndex: undefined as undefined | number
    });

    let columns = [...props.columns];
    if (props.onRowDrag) {
        const dragCol = {
            width: '20px',
            hideBackground: true,
            render: () => <Icon name="grip" size="table" color={Color.neutral_gray_4} backgroundColor={Color.neutral_gray_4} className={classes.draggable} />
        };
        columns = [dragCol, ...props.columns];
    }


    columns.forEach((c: ColumnType<T>, i) => {
        c.dataIndex = c.key;

        const colAsOrignalType = c as TableColumn;

        if (props.onRowDrag) {
            c.className = c.className + ' ' + classes.draggable;
        }

        if (colAsOrignalType.pad !== false) {
            c.className = c.className + ' pad';
        }

        if (colAsOrignalType.hideMobile === true) {
            c.className = c.className + ' hideMobile';
        }

        if (colAsOrignalType.hideBackground && props.data && props.data.length) {
            c.className = c.className + ' noHeader';
        }


        if (colAsOrignalType.sortable === true && c.key && props.data && props.data.length) {

            if (props.onRowDrag) {
                throw new Error('Sorting cannot be used with dragging');
            }

            //@ts-ignore
            const dataType = typeof props.data[0][c.key];

            if (dataType === 'string') {
                c.sorter = (a, b) => {
                    if (a[c.key!].toUpperCase() > b[c.key!].toUpperCase()) {
                        return 1;
                    }
                    return -1;
                };
            } else if (dataType === 'number') {
                c.sorter = (a, b) => a[c.key!] - b[c.key!];
            } else if (dataType === 'boolean') {
                c.sorter = (a, b) => a[c.key!] ? 1 : -1;
            }
            else {
                throw new Error('Cannot sort on this type');
            }
        }

        let expandableOnCell = (value: any, rowIndex?: number) => { return {}; };
        if (colAsOrignalType.expandedRowRender) {
            expandableOnCell = function (value: any, rowIndex?: number) {
                return {
                    onClick: (event: Event) => {
                        if (typeof rowIndex === 'number') {
                            if (state.expandedRowKey === rowIndex + 1 && state.expandedCellKey === colAsOrignalType.key) {
                                setState({
                                    ...state,
                                    expandedCellKey: undefined,
                                    expandedRowKey: undefined
                                });
                            } else {
                                setState({
                                    ...state,
                                    expandedCellKey: colAsOrignalType.key,
                                    expandedRowKey: rowIndex + 1
                                });
                            }
                        }
                    }
                };
            };
        }

        const expandableOnCellStyle = (value: any, rowIndex?: number) => {
            let className = '';

            if (colAsOrignalType.expandedRowRender && typeof rowIndex === 'number') {
                className = (state.expandedRowKey === rowIndex + 1 && state.expandedCellKey === colAsOrignalType.key) ? classes.expanded : classes.expandable;
            }

            return className;
        };

        // This can't be done in CSS, because expanded rows add TRs it will break nth-child
        const altStyleOnCell = (existingClass: string, value: any, rowIndex?: number) => {
            let className = existingClass + ' ';

            if (rowIndex! % 2 !== 0) {
                className += classes.altRow + ' ';
            }

            return className;
        };

        const droppingCellStyle = (existingClass: string, value: any, rowIndex?: number) => {
            let className = existingClass + ' ';

            if (rowIndex === state.droppingRowIndex) {
                className += classes.dropping + ' ';
            }

            return className;
        };

        // We can't have more than one onCell, so we need to run all the changes here
        c.onCell = (value: any, rowIndex?: number) => {
            const className = droppingCellStyle(altStyleOnCell(expandableOnCellStyle(value, rowIndex), value, rowIndex), value, rowIndex);

            return {
                ...expandableOnCell(value, rowIndex),
                className
            };
        };

    });

    const expandable = {
        expandedRowRender: (record: any, rowIndex: number, indent: number, expanded: boolean) => {
            if (!expanded) {
                return null;
            }
            const expandedRowRender = props.columns?.find(x => x.key === state.expandedCellKey)?.expandedRowRender!;
            const closeRows = () => setState({
                ...state,
                expandedCellKey: undefined,
                expandedRowKey: undefined
            });
            return (
                <div className={classes.expandedRowContainer}>
                    <div className={classes.expandedRowClose} onClick={() => closeRows()}>
                        Close <Icon name="x" size="md" color={Color.utility_white} marginBottom="-1px" />
                    </div>
                    {expandedRowRender(record, rowIndex)}
                </div>
            );
        },
        expandedRowKeys: state.expandedRowKey ? [state.expandedRowKey] : [],
        expandedRowClassName: () => classes.expandedRow,
        expandIconColumnIndex: 9999, // Hacks to fix colspan, since we can't opt-out of creating a column with an expand icon
        expandIcon: () => { return <></>; }
    };

    const onChange = (pagination: any, filters: any, sorter: any, extra: TableCurrentDataSource<any>) => {
        setState({
            ...state,
            expandedCellKey: undefined,
            expandedRowKey: undefined
        });

    };

    // rowKey uses the index internally, so sorting breaks the library... so we fix it here
    const rowKey = (record: any, index?: number) => {
        if (typeof index === 'number') {
            return index + 1;  // Their indexes start at 1, because logic
        }
        return 0;
    };

    const locale = {
        emptyText: props.emptyText
    };

    // Draggable
    const onRow = (record: any, index?: number) => {
        if (props.onRowDrag) {
            return {
                draggable: true,
                onDragStart: (event: React.DragEvent<HTMLTableRowElement>) => {
                    if (state.draggingRowIndex !== index) {
                        setState({
                            ...state,
                            draggingRowIndex: index
                        });
                    }
                },
                onDragEnter: (event: React.DragEvent<HTMLTableRowElement>) => {
                    setState({
                        ...state,
                        //@ts-ignore
                        droppingRowIndex: Array.prototype.indexOf.call(event.currentTarget!.parentNode!.children, event.currentTarget)
                    });
                },
                onDragEnd: (event: React.DragEvent<HTMLTableRowElement>) => {
                    props.onRowDrag!(index!, state.droppingRowIndex!);
                    setState({
                        ...state,
                        droppingRowIndex: undefined
                    });
                },
                onDragOver: (event: React.DragEvent<HTMLTableRowElement>) => {
                    event.preventDefault();
                }
            };
        } else {
            return {};
        }
    };


    return <AntTable dataSource={props.data}  {...props} columns={columns} onRow={onRow} locale={locale} rowKey={rowKey} className={classes.table + ' ' + (state.droppingRowIndex !== undefined ? classes.dropping : '')} pagination={false} expandable={expandable} onChange={onChange} />;
};


Table.defaultProps = {
    hideBackground: false,
    pad: true,
    hideMobile: false
};


export default Table;