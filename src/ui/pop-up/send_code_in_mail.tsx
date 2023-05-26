import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {generic} from "../../api/api";
import {useState} from "react";
import {toast} from "react-toastify";

export const SendCodeInMail = (props: any) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [new_password, setNew_password] = useState('')
    const [repeat_new_password, setRepeat_new_password] = useState('')
    const [state, setState] = useState('send_in_email')

    const handleClose = () => {
        props.setOpen(false);
    };
    const send = () => {
        if(state === 'send_in_email'){
            generic.send_code_in_mail(email, setState)
        } else if(state === 'send_code'){
            generic.send_code(email,code, setState)

        } else if(state === 'update_password'){
            if (new_password === repeat_new_password) {
                generic.update_password(props.user_id, '',new_password,'after_checking_the_code',  props.setOpen)

            } else{
                toast.info('Неверный повтор пароля');
            }
        }
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Забыли пароль</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Отправить код для смены пароля на указанную при регистрации почту.
                    </DialogContentText>
                    <TextField
                        onChange={(e) => {
                            setEmail(e.currentTarget.value)
                        }}
                        value={email}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        disabled={state === 'send_code' || state === 'update_password'}
                    />
                    {state === 'send_code'
                        && <TextField
                            onChange={(e) => {
                                if(e.currentTarget.value.length <= 6){
                                    setCode(e.currentTarget.value)
                                }

                            }}
                            value={code}
                            autoFocus
                            margin="dense"
                            id="code"
                            label="Код"
                            type="number"
                            fullWidth
                            variant="standard"
                        />}
                    {state === 'update_password'
                        && <> <TextField
                            onChange={(e) => {
                                if(e.currentTarget.value.length <= 6){
                                    setNew_password(e.currentTarget.value)
                                }

                            }}
                            value={new_password}
                            autoFocus
                            margin="dense"
                            id="new_password"
                            label="Новый пароль"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                            <TextField
                            onChange={(e) => {
                                if(e.currentTarget.value.length <= 6){
                                    setRepeat_new_password(e.currentTarget.value)
                                }

                            }}
                            value={repeat_new_password}
                            autoFocus
                            margin="dense"
                            id="repeat_new_password"
                            label="Повтор нового пароля"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        </>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {(state === 'send_code' || state === 'send_in_email') && <Button onClick={send}>Отправить код</Button>}
                    {state === 'update_password' && <Button onClick={send}>Отправить</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}