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
    ConfirmationDialog,
    CurrentTimeIndicator,
    ViewSwitcher,
    AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import appointments from "./data";
import {useState} from "react";



export const Shedule = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>('2023-03-05');
    const [state, setState] = useState({data: appointments, currentDate: '2023-03-05'})

   function commitChanges({ added, changed, deleted }:any) {
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
        <Paper>
            <Scheduler
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
                />




                <WeekView startDayHour={9} endDayHour={19}/>

                <WeekView startDayHour={9}
                          name="work-week"
                          displayName="Work Week"
                          endDayHour={19}/>


                <MonthView/>





                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher/>
                <ConfirmationDialog />
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton
                />

                <AppointmentForm />
                <CurrentTimeIndicator
                    shadePreviousCells
                    shadePreviousAppointments
                />
            </Scheduler>
        </Paper>
    );
};

