import store from "../../store/state";





// @ts-ignore
export default store._state.schedule_events_data.map(({ date, duration,schedule_one_event_data_id, ...restArgs }) => {
    return {
        startDate:new Date(date),
        endDate:new Date(new Date(date).setMinutes(new Date().getMinutes() + duration)),
        id:schedule_one_event_data_id,
        title:'Собеседование',
        date,
        duration,
        schedule_one_event_data_id,
        ...restArgs,
    };


});
