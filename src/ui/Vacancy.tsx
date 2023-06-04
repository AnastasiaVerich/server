import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Container from "@mui/material/Container";

const columns: GridColDef[] = [
   // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Имя', editable:false},
    { field: 'lastName', headerName: 'Фамилия', width: 130 },
    {
        field: 'age',
        headerName: 'Возраст',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Полное имя',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export  const Vacancy=(props:any) =>{

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 50,
        page: 0,
    });

    return (
        // <div style={{ height: 400, width: '100%' }}>
        <Container maxWidth={false}
                   sx={{
                       height: 'calc(100vh - 68.5px)',
                       width: '100vw',

                       padding:'50px',

                   }}>
            <div style={{boxShadow: '0px 2px 20px 3px rgba(0,0,0,0.2)',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
            <DataGrid
                localeText={{
                    MuiTablePagination: {
                        labelDisplayedRows: ({from, to, count}) =>
                            `${from} - ${to} из ${count}`,
                        labelRowsPerPage: 'Количество строк:'
                    },
                    toolbarDensity: 'Размер строк',
                    toolbarDensityCompact: 'Маленький',
                    toolbarDensityStandard: 'Средний',
                    toolbarDensityComfortable: 'Большой',

                    toolbarColumns: 'Колонки',
                    columnsPanelTextFieldLabel: 'Найти колоку',
                    columnsPanelTextFieldPlaceholder: 'Название колонки',
                    columnsPanelDragIconLabel: 'Сбросить',
                    columnsPanelShowAllButton: 'Показать все',
                    columnsPanelHideAllButton: 'Спрятать все',

                    toolbarFilters: 'Фильтра',
                    filterPanelAddFilter: 'Добавить фильтр',
                    filterPanelRemoveAll: 'Удалить все',
                    filterPanelDeleteIconLabel: 'Удалить',
                    filterPanelLogicOperator: 'Логический оператор',
                    filterPanelOperator: 'Оператор',
                    filterPanelOperatorAnd: 'И',
                    filterPanelOperatorOr: 'Или',
                    filterPanelColumns: 'Колонка',
                    filterPanelInputLabel: 'Значение',
                    filterPanelInputPlaceholder: 'Значение фильтра',

                    filterOperatorContains: 'содержит',
                    filterOperatorEquals: 'равен',
                    filterOperatorStartsWith: 'начинается с',
                    filterOperatorEndsWith: 'заканчивается на',
                    filterOperatorIs: 'является ',
                    filterOperatorNot: 'не является',
                    filterOperatorAfter: 'после',
                    filterOperatorOnOrAfter: 'после или включая',
                    filterOperatorBefore: 'до',
                    filterOperatorOnOrBefore: 'до или включая',
                    filterOperatorIsEmpty: 'простой',
                    filterOperatorIsNotEmpty: 'не простой',
                    filterOperatorIsAnyOf: 'любой из',

                    toolbarExport: 'Скачать',
                    toolbarExportLabel: 'Скачать',
                    toolbarExportCSV: 'Скачать как CSV',
                    toolbarExportPrint: 'Печать',
                    toolbarExportExcel: 'Скачать как Excel',

                    footerRowSelected: (count) =>
                        count !== 1
                            ? `${count.toLocaleString()} строк выделено`
                            : `${count.toLocaleString()} строка выделена`,

                    columnMenuLabel: 'Меню',
                    columnMenuShowColumns: 'Показать колонку',
                    columnMenuManageColumns: 'Manage columns',
                    columnMenuFilter: 'Фильтр',
                    columnMenuHideColumn: 'Спрятать колонку',
                    columnMenuUnsort: 'Не сортировать',
                    columnMenuSortAsc: 'Сортировать по возр.',
                    columnMenuSortDesc: 'Сортировать по убыв.',

                }}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rows={props.vacancy?props.vacancy:rows}
                columns={props.headers?props.headers:columns}
                onRowClick={(params, event, details)=>{
                    console.log(params.row.resume_id)
                    console.log(event)
                    console.log(details)
                }}

                slots={{
                    toolbar: GridToolbar,
                }}
                pageSizeOptions={[25, 50, 100]}
            />
            </div>
        </Container>
    );
}