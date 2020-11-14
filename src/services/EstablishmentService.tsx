import axios from 'axios';

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
    menu_id: number;
    user_id: number;
}

export class EstablishmentService {

    static createEstablishment(establishment: Establishment) {
        axios.post(`http://127.0.0.1:5000/establishments`, establishment)
            .then(res => {
                const ans = res.data.users;
                establishment = ans;
                console.log(res);
            });
    }

    static getAllEstablishments(holder: Establishment[]) {
        axios.get(`http://127.0.0.1:5000/establishments`)
            .then(res => {
                const ans = res.data.users;
                holder = ans;
                console.log(res);
            });
    }

    static getEstablishmentById(eid: number, e: Establishment) {
        axios.get(`http://127.0.0.1:5000/establishments/${eid}`)
            .then(res => {
                const ans = res.data.establishment;
                e = ans;
                console.log(res);
            });
    }

    static editEstablishmentById(eid: number, e: Establishment) {
        axios.put(`http://127.0.0.1:5000/establishments/${eid}`, e)
            .then(res => {
                const ans = res.data.users;
                e = ans;
                console.log(res);
            });
    }

    static deleteEstablishmentById(eid: number) {
        axios.delete(`http://127.0.0.1:5000/establishments/${eid}`)
            .then(res => console.log(res));
    }




}