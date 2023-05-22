import axios from 'axios';
import store from '../store/state'
export const generic ={
    registration(form_data:any,role:string){
        axios.post('http://localhost:3001/api/registration',{
            form_data:form_data,
            role:role,
        })
            .then(function (response) {
                store._state.user.user_data = form_data
                store.update_state_object(store._state.user.user_data,form_data)
                store.update_state_object(store._state.user.user_hr_organization[0],form_data)
                window.location.href  = 'http://localhost:3000/#/'
                alert('Сохранено');
            })
            .catch(function (error) {
                console.log(error);
                alert('Ошибка');

            })
    },
    login(form_data:any,remember:FormDataEntryValue|null){
        axios.post('http://localhost:3001/api/login',{
            form_data:form_data,
            remember:remember
        })
            .then(function (response) {
                console.log(response)
                store.update_state_object(store._state.user.user_data,response.data.user_data)
                window.location.href  = 'http://localhost:3000/#/'
                alert('ЗАШЕЛ');
            })
            .catch(function (error) {
                console.log(error);
                alert('Ошибка');

            })
    },
}
