import moment from 'moment';
import { appointments } from './appointments';




export default appointments.map(({ date, duration,schedule_one_event_data_id, ...restArgs }) => {
    return {
        startDate:new Date(date),
        endDate:new Date(new Date(date).setMinutes(new Date().getMinutes() + duration)),
        id:schedule_one_event_data_id,
        date,
        duration,
        schedule_one_event_data_id,
        ...restArgs,
    };


});
