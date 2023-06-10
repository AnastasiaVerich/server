import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from "@mui/material/List";
import InputLabel from "@mui/material/InputLabel";
import Chip from '@mui/material/Chip';
import {enum_employment_type} from "./common/enum";
import ListItem from '@mui/material/ListItem';
import ListItemText from "@mui/material/ListItemText";
import {commonVR} from "../api/api";

export const Resume = (props: any) => {

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 50,
        page: 0,
    });
    const [selectedResume, setSelectedResume] = React.useState<any>(undefined);
    const [selectedVacancyId, setSelectedVacancyId] = React.useState<any>(undefined);

    const bull = (
        <Box
            component="span"
            sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
        >
            •
        </Box>
    );

    function invite(){

        commonVR.invite_user(props.state.main_table.selected_id, selectedVacancyId)
    }

    return (
        <>
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
                    rows={props.state.resume ? props.state.resume : []}
                    columns={props.state.main_table.headers ? props.state.main_table.headers : []}
                    onRowClick={(params, event, details) => {

                        props.changeSelectedId(params.row.resume_id)
                        setSelectedResume(props.state.resume.find((x:any)=>x.resume_id === params.row.resume_id))
                    }}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    sx={{border:'none'}}
                    pageSizeOptions={[25, 50, 100]}
                />
                {selectedResume !== undefined
                    && <Box
                    sx={{
                        width: '30vw',
                        height: '100%',
                        borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
                    }}
                >
                    <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    {selectedResume.job_title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h6" component="div" sx={{lineHeight:'normal'}}>
                                    {selectedResume.surname} {selectedResume.name} {selectedResume.patronymic}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography  component="div" color="text.secondary">
                            {bull}Город {<b>{selectedResume.city}</b>}
                        </Typography>
                        <Typography  component="div" color="text.secondary">
                            {bull}Зарплата от {<b>{selectedResume.salary} бел. руб.</b>}
                        </Typography>
                        <Typography  component="div" color="text.secondary">
                            {bull}Навыки
                        </Typography>
                        <Stack  direction="row"  flexWrap="wrap">
                            {selectedResume.skills.map((x:any)=>{
                                return <Chip label={x}  sx={{m: 1}}/>
                            })}
                        </Stack>
                        <Typography  component="div" color="text.secondary">
                            {bull}Тип занятости
                        </Typography>
                        <List  >
                            {enum_employment_type.filter((x:any)=>selectedResume.employment_type.indexOf(x.value) !== -1).map((x:any)=>{
                                return <ListItem sx={{m:0, p:0}}>
                                    <ListItemText
                                        primary={x.label}
                                    />
                                </ListItem>
                            })}
                        </List>
                        <Typography  component="div" color="text.secondary">
                            {bull}Знание языков
                        </Typography>
                        <List  >
                            {selectedResume.language.map((x:any)=>{
                                return <ListItem sx={{m:0, p:0}}>
                                    <ListItemText
                                        primary={x.language}
                                        secondary={x.level}
                                    />
                                </ListItem>
                            })}
                        </List>

                        <Typography  component="div" color="text.secondary">
                            {bull}О себе
                        </Typography>
                        <Typography  variant="body2">
                            {selectedResume.note}
                        </Typography>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ ml: 2, mr: 2, mt: 2 }}>
                        <Typography gutterBottom variant="body1">
                            Выберите вакансию
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Вакансия</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedVacancyId}
                                onChange={(event)=>{
                                    setSelectedVacancyId(event.target.value)
                                }}

                                label="Вакансия">
                                {props.state.vacancy.map((x:any)=>{
                                    return <MenuItem value={x.vacancy_id}>{x.label}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{  ml: 1, mb: 1 }}>
                        <Button onClick={invite}>Пригласить</Button>
                    </Box>
                </Box>}
                </div>
            </Container>
        </>
    );
}