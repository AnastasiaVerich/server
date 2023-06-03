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



export const Schedule = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());
    const [state, setState] = useState({data: appointments, currentDate: new Date()})


   function commitChanges({ added, changed, deleted }:any) {
        console.log(changed)
        console.log(deleted)
        // @ts-ignore
       setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map((appointment:any) => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter((appointment:any) => appointment.id !== deleted);
            }
            return { data };
        });

    }


    return (
        <Paper>{/* // @ts-ignore*/}
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
                <IntegratedEditing />
                <DayView
                    startDayHour={7}
                    endDayHour={12}
                    displayName="День"
                />

                <WeekView startDayHour={9} endDayHour={19} displayName="Неделя"/>
                <MonthView  displayName="Месяц"/>

                <Toolbar />
                <DateNavigator />
                <TodayButton messages={{
                    today:'Сегодня'
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
                                 messages={{commitCommand:'Сохранить'}}/>
                <CurrentTimeIndicator
                    shadePreviousCells
                    shadePreviousAppointments
                />
            </Scheduler>
        </Paper>
    );
};

const NullField = (props:any) => {
    return null;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }:any) => {



    return (<>

        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >

            <AppointmentForm.Label type={'titleLabel'} text={'Детали:'} style={{fontWeight:700, fontSize: '19px', paddingBottom:'8px'}}/>
            <AppointmentForm.DateEditor
                locale={'ru-RU'}
                value={appointmentData.date}
                onValueChange={(nextValue)=>{
                    onFieldChange({ date: nextValue,  });

                }}
            />

            <AppointmentForm.TextEditor
                style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft:'10%'}}
                value={appointmentData.duration}
                onValueChange={(nextValue)=>{
                    onFieldChange({ duration: nextValue,  });

                }}
                placeholder="Длительность"
                readOnly={false} type={'numberEditor'}/>

            <AppointmentForm.Label type={'titleLabel'}
                                   style={{width: '45%', margin: 0, display:'inline-flex', marginTop: '16px'}}
                                   text={'Выберите вакансию:'}/>
            <AppointmentForm.Label type={'titleLabel'}
                                   style={{width: '45%', margin:0, display:'inline-flex', marginLeft:'10%', marginTop: '16px'}}
                                   text={'Выберите кандидата:'}/>
            <AppointmentForm.Select
                style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft:'0'}}
                value={appointmentData.vacancy_id}
                onValueChange={(nextValue)=>{
                    onFieldChange({ vacancy_id: nextValue,  });
                }}
                availableOptions={[{text:'10', id:1},{text:'50', id:2}]}
                type={'outlinedSelect'}
            >
            </AppointmentForm.Select>
            <AppointmentForm.Select
                style={{width: '45%', marginTop: '16px', marginBottom: '8px', marginLeft:'10%'}}
                value={appointmentData.user_id}
                onValueChange={(nextValue)=>{
                    onFieldChange({ user_id: nextValue,  });
                }}
                availableOptions={[{text:'10', id:1},{text:'50', id:2}]}
                type={'outlinedSelect'}
            >
            </AppointmentForm.Select>
        </AppointmentForm.BasicLayout>

        </>
    );
};