let store = {
    _state: {
        user:{
            user_data: {
                type:'',
                user_id:'',

                surname: '',
                name: '',
                patronymic: '',

                phone_number: '',
                email: '',
                password:'',
                status: '',
            },
            user_hr_additional_data:{
                hr_user_additional_data_id:'',
                user_id:'',
                job_title:'',
            },
            user_hr_organization:[{
                user_hr_organization_id:'',
                organization_label:'',
                legal_address:'',
            }],
          /*  user_hr_organization_mediator:[{
                user_hr_organization_mediator_id:'',
                user_id:'',
                organization_id:'',
            }],*/

            user_candidate_languages_data:[{
                user_candidate_languages_data_id:'',
                user_id:'',
                language:'',
                level:'',
            }],
            user_candidate_education_data:[{
                user_candidate_education_data_id:'',
                user_id:'',
                year_ending:'',
                organization:'',
                speciality:'',
                type:'',
            }],
            user_candidate_experience_data:[{
                user_candidate_experience_data_id:'',
                user_id:'',
                from:'',
                to:'',
                job_title:'',
                organization:'',
            }],

        },

        main_table:{
            filter:{},
            data_th:[],
            data_tr:[],

           /* cv:[{
                cv_id:'',
                user_id:'',
                nationality:'',
                city:'',
                job_title:'',
                salary:'',
                skills:[],
                note:'',
                gender:'',
                employment_type:'',
            }],
            cv_language_mediator:[{
                cv_language_mediator_id:'',
                cv_id:'',
                languages_data_id:'',
            }],
            cv_education_mediator:[{
                cv_education_mediator_id:'',
                cv_id:'',
                education_data_id:'',
            }],
            cv_experience_mediator:[{
                cv_experience_mediator_id:'',
                cv_id:'',
                experience_data_id:'',
            }],

            vacancy:[{
                vacancy_id:'',
                owner_id:'',
                job_title:'',
                experience:'',
                city:'',
                salary:'',
                skills:'',
                note:'',
                interview_questions_id:'',
                employment_type:'',
                paragraph_data_id:'',
            }],
            vacancy_languages_data:[{
                vacancy_languages_data_id:'',
                language:'',
                level:'',
                vacancy_id:'',
            }],
            vacancy_paragraph_data:[{
                vacancy_paragraph_data_id:'',
                title:'',
                text:'',
            }],
            vacancy_paragraph_mediator:[{
                vacancy_paragraph_mediator_id:'',
                vacancy_id:'',
                paragraph_id:'',
            }],*/

            vacancy_with_cv_connection:[{
                vacancy_with_cv_connection_id:'',
                vacancy_id:'',
                cv_id:'',
            }],


        },

        interview_questions:{
            interview_questions_data:{
                interview_questions_id:'',
                owner_id:'',
                title:'',
            },
            interview_questions_one_data:[{
                interview_questions_one_data_id:'',
                interview_questions_id:'',
                label:'',
                prefer_answer:'',
                items:[],
                type:'',
            }],
            interview_questions_answer:[{
                interview_questions_answer_id:'',
                vacancy_with_cv_connection_id:'',
                interview_questions_one_data_id:'',
                answer:'',
            }],
        },

        schedule:{
            /*schedule_data:{
                schedule_id:'',
                owner_id:'',
            },*/
            schedule_one_event_data:[{
                schedule_one_event_data_id:'',
                schedule_id:'',
                date:'',
                time:'',
                duration:'',
                connection_vacancy_with_cv_id:'',
                recording_id:'',
            }],
        },

        recording:{
            data:[],
            recording_data:[{
                recording_id:'',
                recording_url:'',
            }],
        },

        chat:{
            chat_data:[{
                chat_id:'',
                connection_vacancy_with_cv_id:'',
            }],
            chat_members:[{
                chat_members_id:'',
                chat_id:'',
                user_id:'',
            }],
            chat_one_message_data:[{
                chat_one_message_data_id:'',
                chat_id:'',
                sender_id:'',
                date:'',
                text:'',
                status:'',
            }],
        },

        generic:{
            //unlogged hr candidate test
            //0-незарег, 1 - HR 2- Кандидат, 4 - тест нужных пунктов
            auth_state:'unlogged',
        }

    },
    update_state_object(prev_state:any, new_state:any) {
        console.log('555')
        Object.keys(new_state).map(el=>{
            if(el in prev_state){
                prev_state[el]=new_state[el]
            }
        })
        store.render()
    },
    change_auth_state(new_state:string){
        this._state.generic.auth_state = new_state
        store.render()
    },





    render() {
        this._callSubscriber(this._state, 'null');
    },
    getState() {
        return this._state
    },
    _callSubscriber(x: any, swichw: any) {

    },
    subscribe(oserv: any) {
        this._callSubscriber = oserv;
    }
}
export default store;
// @ts-ignore
window.store = store;