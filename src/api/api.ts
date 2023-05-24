import axios from 'axios';
import store from '../store/state'
import {toast} from "react-toastify";
export const generic ={
    registration(form_data:any,type:string){
        axios.post('http://localhost:3001/api/registration',{
            form_data:form_data,
            type:type,
        })
            .then(function (response) {
                store._state.user.user_data = form_data
                store.update_state_object(store._state.user.user_data,form_data)
                store.update_state_object(store._state.user.user_hr_organization[0],form_data)
                if(type==='candidate'){
                    store.change_auth_state('candidate')
                }else if(type === 'hr'){
                    store.change_auth_state('hr')
                }

                window.location.href  = 'http://localhost:3000/#/'
                toast.info('Info message')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

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
                if(response.data.user_data.type==='candidate'){
                    store.change_auth_state('candidate')
                }else if(response.data.user_data.type === 'hr'){
                    store.change_auth_state('hr')
                }
                window.location.href  = 'http://localhost:3000/#/'
                toast.info('ЗАШЕЛ')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
}
