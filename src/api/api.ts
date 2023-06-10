import axios from 'axios';
import store from '../store/state'
import {toast} from "react-toastify";
import {socket} from "../socket";

export const generic = {
    registration(form_data: any, type: string) {
        axios.post('http://localhost:3001/api/registration', {
            form_data: form_data,
            type: type,
        })
            .then(function (response) {
                store.update_state_object(store._state.user.user_data, form_data)
                store._state.user.user_data.type = type
                store._state.user.user_data.schedule_id = response.data.schedule_id
                store.update_state_object(store._state.user.user_hr_organization[0], form_data)
                if (type === 'candidate') {
                    store.change_auth_state('candidate')
                } else if (type === 'hr') {
                    store.change_auth_state('hr')
                }
                vacancy.get_interview_answer()
                vacancy.get_vacancy(1000)
                vacancy.get_interview_questions()
                resume.get_resume(1000)
                commonVR.get_all_invite()
                schedule.get_all_events()
                window.location.href = 'http://localhost:3000/#/'
                toast.info('Info message')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    login(form_data: any, remember: FormDataEntryValue | null) {
        axios.post('http://localhost:3001/api/login', {
            form_data: form_data,
            remember: remember
        })
            .then(function (response) {
                console.log(response)
                store.update_state_object(store._state.user.user_data, response.data.user_data)
                if (response.data.user_data.type === 'candidate') {
                    store.change_auth_state('candidate')
                } else if (response.data.user_data.type === 'hr') {
                    store.change_auth_state('hr')
                }
                vacancy.get_interview_answer()
                vacancy.get_vacancy(1000)
                vacancy.get_interview_questions()
                resume.get_resume(1000)
                commonVR.get_all_invite()
                schedule.get_all_events()
                window.location.href = 'http://localhost:3000/#/'
                socket.emit('login_user', {
                    user_id: store._state.user.user_data.user_id,
                });
                toast.info('ЗАШЕЛ')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    logout(user_id: any) {
        axios.post('http://localhost:3001/api/logout', {
            user_id: user_id,
        })
            .then(function (response) {
                console.log(response)
                store.return_initial_state_object(store._state.user.user_data, store._initial_state.user.user_data)
                store.return_initial_state_object(store._state.user.user_hr_organization[0], store._initial_state.user.user_hr_organization[0])
                store.change_auth_state('unlogged')

                window.location.href = 'http://localhost:3000/#/'
                toast.info('Вышел')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    delete_user(user_id: any) {
        axios.post('http://localhost:3001/api/delete_user', {
            user_id: user_id,
        })
            .then(function (response) {
                console.log(response)
                store.return_initial_state_object(store._state.user.user_data, store._initial_state.user.user_data)
                store.return_initial_state_object(store._state.user.user_hr_organization[0], store._initial_state.user.user_hr_organization[0])
                store.change_auth_state('unlogged')

                window.location.href = 'http://localhost:3000/#/'
                toast.info('Удален')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');

            })
    },
    update_password(user_id: any, old_password: any, new_password: any, state: string, setOpen?: any) {
        axios.post('http://localhost:3001/api/update_password', {
            user_id: user_id,
            old_password: old_password,
            new_password: new_password,
            state: state
        })
            .then(function (response) {
                console.log(response)
                store.update_state_object(store._state.user.user_data, {password: new_password})
                toast.info(response.data.text)
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.text);

            })
    },
    send_code_in_mail(email: any, setState: any) {
        axios.post('http://localhost:3001/api/send_code_in_mail', {
            email: email,
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
    send_code(email: any, code: any, setState: any) {
        axios.post('http://localhost:3001/api/send_code', {
            email: email,
            code: Number(code),
        })
            .then(function (response) {
                store.update_state_object(store._state.user.user_data, response.data)
                setState('update_password')
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.text);

            })
    },
}

export const resume = {
    create_resume(form_data: any, user_id: string) {
        axios.post('http://localhost:3001/api/create_resume', {
            form_data: form_data,
            user_id: user_id,
        })
            .then(function (response) {
                resume.get_resume(1000)
                toast.info('сохранено')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_resume(count: number) {
        axios.post('http://localhost:3001/api/get_resume', {
            count: count,
        })
            .then(function (response) {
                store._state.resume = response.data.result
                store._state.main_table.headers = response.data.header
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
}
export const vacancy = {
    create_vacancy(form_data: any, user_id: string) {
        axios.post('http://localhost:3001/api/create_vacancy', {
            form_data: form_data,
            user_id: user_id,
        })
            .then(function (response) {
                toast.info('сохранено')
                vacancy.get_vacancy(1000)
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    create_interview_questions(form_data: any, user_id: string) {
        axios.post('http://localhost:3001/api/create_interview_questions', {
            form_data: form_data,
            user_id: user_id,
        })
            .then(function (response) {
                vacancy.get_interview_questions()
                toast.info('сохранено')
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_vacancy(count: number) {
        axios.post('http://localhost:3001/api/get_vacancy', {
            count: count,
        })
            .then(function (response) {

                store._state.vacancy = response.data.result
                store._state.main_table.headers = response.data.header
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_interview_questions() {
        axios.post('http://localhost:3001/api/get_interview_questions', {})
            .then(function (response) {

                store._state.interview_questions = response.data.data
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    update_vacancy_interview_questions(interviewQuestionsId:number, vacancy_id:number) {
        axios.post('http://localhost:3001/api/update_vacancy_interview_questions', {
            interviewQuestionsId: interviewQuestionsId,
            vacancy_id: vacancy_id,
        })
            .then(function (response) {
                vacancy.get_vacancy(100)
                toast.info('Изменено');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    save_interview_answer(data:any,connection_vacancy_with_cv_id:number){
        axios.post('http://localhost:3001/api/save_interview_answer', {
            data: data,
            connection_vacancy_with_cv_id: connection_vacancy_with_cv_id,
        })
            .then(function (response) {
                vacancy.get_vacancy(100)
                vacancy.get_interview_answer()
                toast.info('Сохранено');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_interview_answer(){
        axios.post('http://localhost:3001/api/get_interview_answer', {
        })
            .then(function (response) {
                store._state.interview_questions_answer = response.data.data
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
}
export const commonVR = {
    invite_user(resume_id: number, vacancy_id: number) {
        axios.post('http://localhost:3001/api/invite_user', {
            resume_id: resume_id,
            vacancy_id: vacancy_id,
        })
            .then(function (response) {

                commonVR.get_all_invite()
                toast.info('Отправленно!');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_all_invite() {
        axios.post('http://localhost:3001/api/get_vacancy_with_resume_connection', {})
            .then(function (response) {
                store._state.vacancy_with_cv_connection = response.data.data
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
}
export const schedule = {
    create_event(date: string, duration: number, connection_vacancy_with_cv_id: number, schedule_id: number, confirmation_user_id: number) {
        axios.post('http://localhost:3001/api/create_event', {
            date: date,
            duration: duration,
            connection_vacancy_with_cv_id: connection_vacancy_with_cv_id,
            schedule_id: schedule_id,
            confirmation_user_id: confirmation_user_id
        })
            .then(function (response) {
                schedule.get_all_events()
                commonVR.get_all_invite()
                toast.info('Создано!');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    update_event(date: string, duration: number, connection_vacancy_with_cv_id: number, schedule_id: number) {
        axios.post('http://localhost:3001/api/create_event', {
            date: date,
            duration: duration,
            connection_vacancy_with_cv_id: connection_vacancy_with_cv_id,
            schedule_id: schedule_id,
        })
            .then(function (response) {
                schedule.get_all_events()
                commonVR.get_all_invite()
                toast.info('Создано!');
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    get_all_events() {
        axios.post('http://localhost:3001/api/get_all_events', {})
            .then(function (response) {
                store._state.schedule_events_data = response.data.data
                store.render()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
    confirm_schedule(shedule_confirmation_id: number) {
        axios.post('http://localhost:3001/api/schedule_confirmed', {
            shedule_confirmation_id: shedule_confirmation_id,
            schedule_id: store._state.user.user_data.schedule_id
        })
            .then(function (response) {
                store._state.notification.arr = store._state.notification.arr.filter((x: any) => x.shedule_confirmation_id !== shedule_confirmation_id)
                store._state.notification.count = store._state.notification.arr.length
                store.render()
                schedule.get_all_events()
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Ошибка');
            })
    },
}
