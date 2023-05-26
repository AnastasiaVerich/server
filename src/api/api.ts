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
    logout(user_id:any){
        axios.post('http://localhost:3001/api/logout',{
            user_id:user_id,
        })
            .then(function (response) {
                console.log(response)
                store.return_initial_state_object(store._state.user.user_data,store._initial_state.user.user_data)
                store.return_initial_state_object(store._state.user.user_hr_organization[0],store._initial_state.user.user_hr_organization[0])
                store.change_auth_state('unlogged')

                window.location.href  = 'http://localhost:3000/#/'
                toast.info('Вышел')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    delete_user(user_id:any){
        axios.post('http://localhost:3001/api/delete_user',{
            user_id:user_id,
        })
            .then(function (response) {
                console.log(response)
                store.return_initial_state_object(store._state.user.user_data,store._initial_state.user.user_data)
                store.return_initial_state_object(store._state.user.user_hr_organization[0],store._initial_state.user.user_hr_organization[0])
                store.change_auth_state('unlogged')

                window.location.href  = 'http://localhost:3000/#/'
                toast.info('Удален')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    update_password(user_id:any, old_password:any, new_password:any, state:string, setOpen?:any){
        axios.post('http://localhost:3001/api/update_password',{
            user_id:user_id,
            old_password:old_password,
            new_password:new_password,
            state:state
        })
            .then(function (response) {
                console.log(response)
                store.update_state_object(store._state.user.user_data,{password:new_password})
                toast.info(response.data.text)
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.text);

            })
    },
    send_code_in_mail(email:any,setState:any){
        axios.post('http://localhost:3001/api/send_code_in_mail',{
            email:email,
        })
            .then(function (response) {
                setState('send_code')
                toast.info('Код отправлен')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('ошибка');

            })
    },
    send_code(email:any,code:any,setState:any){
        axios.post('http://localhost:3001/api/send_code',{
            email:email,
            code:Number(code),
        })
            .then(function (response) {
                store.update_state_object(store._state.user.user_data,response.data)
                setState('update_password')
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.text);

            })
    },
}

export const resume={
    create_resume(form_data:any,user_id:string){
        axios.post('http://localhost:3001/api/create_resume',{
            form_data:form_data,
            user_id:user_id,
        })
            .then(function (response) {
                toast.info('сохранено')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
}
