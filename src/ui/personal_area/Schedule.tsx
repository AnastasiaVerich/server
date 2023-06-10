import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    ViewState,
    EditingState,
    IntegratedEditing,
    SchedulerDateTime
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    TodayButton,
    AppointmentTooltip,
    CurrentTimeIndicator,
    ViewSwitcher,
    AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import appointments from "./data";
import {useState} from "react";
import store from '../../store/state'
import {schedule} from "../../api/api";


export const Schedule = (props: any) => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());

    const [state, setState] = useState({
        data: store._state.schedule_events_data
            .filter((x:any)=>x.schedule_id === store._state.user.user_data.schedule_id)
            .map(({date, duration, schedule_one_event_data_id, ...restArgs}:any) => {
            return {
                startDate: new Date(date),
                endDate: new Date(new Date(date).setMinutes(new Date().getMinutes() + duration)),
                id: schedule_one_event_data_id,
                title: 'Собеседование',
                date,
                duration,
                schedule_one_event_data_id,
                ...restArgs,
            };


        }), currentDate: new Date()
    })


    function commitChanges({added, changed, deleted}: any) {



        if (added !== undefined) {
            let vacancy_with_cv_connection = props.state.vacancy_with_cv_connection.find((x: any) => x.vacancy_with_resume_connection_id === added.connection_vacancy_with_cv_id)
            let confirmation_user_id = 0
            if (props.state.user.user_data.type === 'hr') {
                confirmation_user_id = props.state.resume.find((x: any) => x.resume_id === vacancy_with_cv_connection.resume_id).user_id
            } else {
                confirmation_user_id = props.state.vacancy.find((x: any) => x.vacancy_id === vacancy_with_cv_connection.vacancy_id).owner_id
            }

            schedule.create_event(added.date
                , Number(added.duration)
                , added.connection_vacancy_with_cv_id
                , store._state.user.user_data.schedule_id
                , confirmation_user_id)
        }
        if (changed !== undefined) {

        }
        if (deleted !== undefined) {

        }
        // @ts-ignore
        setState((state) => {
            let {data} = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, {id: startingAddedId, ...added}];
            }
            if (changed) {
                data = data.map((appointment: any) => (
                    changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter((appointment: any) => appointment.id !== deleted);
            }
            return {data};
        });

    }


    return (
        <Paper sx={{height: '100%'}}>{/* // @ts-ignore*/}
            <Scheduler
                locale={"ru-RU"}
                data={state.data}>
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                    defaultCurrentViewName="Week"
                />
                <EditingState
                    onCommitChanges={commitChanges}
                />
                <IntegratedEditing/>
                <DayView
                    startDayHour={7}
                    endDayHour={12}
                    displayName="День"
                />

                <WeekView startDayHour={9} endDayHour={19} displayName="Неделя"/>
                <MonthView displayName="Месяц"/>

                <Toolbar/>
                <DateNavigator/>
                <TodayButton messages={{
                    today: 'Сегодня'
                }}/>
                <ViewSwitcher/>
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                />
                {/*// @ts-ignore*/}
                <AppointmentForm labelComponent={NullField}
                                 dateEditorComponent={NullField}
                                 textEditorComponent={NullField}
                                 basicLayoutComponent={BasicLayout}
                                 booleanEditorComponent={NullField}
                                 messages={{commitCommand: 'Сохранить'}}/>
                <CurrentTimeIndicator
                    shadePreviousCells
                    shadePreviousAppointments
                />
            </Scheduler>
        </Paper>
    );
};

const NullField = (props: any) => {
    return null;
};

const BasicLayout = ({onFieldChange, appointmentData, ...restProps}: any) => {

    const [vacancyID, setVacancyID] = useState<number | string>('')
    const [resumeID, setResumeID] = useState<number | string>('')


    return (<>
            <AppointmentForm.BasicLayout
                appointmentData={appointmentData}
                onFieldChange={onFieldChange}
                {...restProps}
            >
                <AppointmentForm.Label type={'titleLabel'} text={'Детали:'}
                                       style={{fontWeight: 700, fontSize: '19px', paddingBottom: '8px'}}/>
                <AppointmentForm.DateEditor
                    locale={'ru-RU'}

                    value={appointmentData.date}
                    onValueChange={(nextValue) => {

                        onFieldChange({date: nextValue,});

                    }}
                />
                <AppointmentForm.TextEditor
                    style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft: '10%'}}
                    value={appointmentData.duration}
                    onValueChange={(nextValue) => {
                        onFieldChange({duration: nextValue,});

                    }}
                    placeholder="Длительность"
                    readOnly={false} type={'numberEditor'}/>

                <AppointmentForm.Label type={'titleLabel'}
                                       style={{width: '45%', margin: 0, display: 'inline-flex', marginTop: '16px'}}
                                       text={'Выберите вакансию:'}/>
                <AppointmentForm.Label type={'titleLabel'}
                                       style={{
                                           width: '45%',
                                           margin: 0,
                                           display: 'inline-flex',
                                           marginLeft: '10%',
                                           marginTop: '16px'
                                       }}
                                       text={'Выберите кандидата:'}/>
                <AppointmentForm.Select
                    style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft: '0'}}
                    value={vacancyID}
                    onValueChange={(nextValue) => {
                        setVacancyID(nextValue);
                    }}
                    availableOptions={store._state.vacancy.map((x: any) => {
                        return {text: x.label, id: x.vacancy_id}
                    })}
                    type={'outlinedSelect'}
                >
                </AppointmentForm.Select>
                <AppointmentForm.Select
                    style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft: '10%'}}
                    value={resumeID}
                    onValueChange={(nextValue) => {
                        setResumeID(nextValue);
                        let connection_vacancy_with_cv = store._state.vacancy_with_cv_connection.find((x: any) => x.vacancy_id === vacancyID && x.resume_id === nextValue)
                        // @ts-ignore
                        onFieldChange({connection_vacancy_with_cv_id: connection_vacancy_with_cv.vacancy_with_resume_connection_id});
                    }}
                    availableOptions={store._state.vacancy_with_cv_connection
                        .filter((x: any) => x.vacancy_id === vacancyID)
                        .map((x: any) => {
                            let user: any = store._state.resume.find((z: any) => z.resume_id === x.resume_id)
                            return {
                                text: user.surname
                                , id: x.resume_id
                            }
                        })}
                    type={'outlinedSelect'}
                >
                </AppointmentForm.Select>
            </AppointmentForm.BasicLayout>

        </>
    );
};