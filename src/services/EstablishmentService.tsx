import axios from 'axios';
import { goToNewRestaurant } from '../components/CreateRestaurant/CreateRestaurant';
import { SERVER_STR } from '../components/Login/Login';
import { Dish } from './DishService';
import { User } from './UserService';

export interface Establishment {
    eid?: number;
    name: string;
    description: string;
    phone: string;
    location: string;
    openTime: string;
    closeTime: string;
    openFromDay: string;
    openToDay: string;
    user_id?: number;
    image_url: string; 
}

export class EstablishmentService {

    static createEstablishment(establishment: Establishment) {
        console.log(establishment);
        axios.post(SERVER_STR+`/establishments`, establishment)
            .then(res => {
                const ans = res.data.establishment;
                establishment = ans;
                console.log(res);
                console.log(establishment);
                goToNewRestaurant(establishment);
            });
    }

    static getAllEstablishments(holder: Establishment[]) {
        axios.get(SERVER_STR+`/establishments`)
            .then(res => {
                const ans = res.data.users;
                holder = ans;
                console.log(res);
            });
    }

    static async getEstablishmentById(eid: number, setEstablishment: (e: Establishment) => void) {
        await axios.get(SERVER_STR+`/establishments/${eid}`)
            .then(res => {
                const ans = res.data.establishment;
                setEstablishment(ans);
                console.log(res);
            });
    }

    static editEstablishmentById(eid: number, e: Establishment) {
        axios.put(SERVER_STR+`/establishments/${eid}`, e)
            .then(res => {
                const ans = res.data.users;
                e = ans;
                console.log(res);
            });
    }

    static deleteEstablishmentById(eid: number) {
        axios.delete(SERVER_STR+`/establishments/${eid}`)
            .then(res => console.log(res));
    }




}