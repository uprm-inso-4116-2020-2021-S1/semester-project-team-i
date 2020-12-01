import axios from 'axios';
import { SERVER_STR, setLoggedInUser } from '../components/Login/Login';
import { setRegisterLoggedInUser } from '../components/Register/Register';
import { Establishment } from './EstablishmentService';

export const server = 'http://127.0.0.1:5000/';

export interface User {
    uid?: number;
    username?: string;
    password: string;
    email: string;
    isVerified?: boolean;
    firstName: string;
    lastName: string;
    establishments?: Establishment[];
}

export class UserService {

    static login(credentials: {username: string, password: string}) {
        axios.post(SERVER_STR+`/login`, credentials)
        .then(res => {
                const uid = res.data.user_id as number;
                console.log(res);
                setLoggedInUser(uid);
            });
    }

    static createUser(user: User) {
        let uid = -1;
        axios.post(SERVER_STR+`/users`, user)
            .then(res => {
                const newUser = res.data.user;
                uid = newUser.uid as number;
                console.log(res);
                setRegisterLoggedInUser(uid);
            });
    }

    static getUserById(uid: number, user: User) {
        axios.get(SERVER_STR+`/users/${uid}`).then(res => {
            user = res.data.user;
            console.log(res);
            
        });
    }

    static deleteUserById(uid: number, user: User) {
        axios.delete(SERVER_STR+`/users/${uid}`).then(res => {
            console.log(res);
            
        });
    }

    static editUserById(uid: number, user: User) {
        axios.put(SERVER_STR+`/users/${uid}`, user).then(res => {
            user = res.data.user;
            console.log(res);
            
        });
    }
}