import axios from 'axios';
import { SERVER_STR } from '../components/Login/Login';

export interface MenuResp {
    mid?: number;
    name: string;
}

export class MenuService {

    static createMenu(menu: MenuResp) {
        axios.post(SERVER_STR+`/menus`, menu)
            .then(res => {
                const ans = res.data.menu;
                menu = ans;
                console.log(res);
            });
    }

    static getAllMenus(menus: MenuResp[]) {
        axios.get(SERVER_STR+`/menus`)
            .then(res => {
                const ans = res.data.menus;
                menus = ans;
                console.log(res);
            });
    }

    static getMenuById(mid: number, m: MenuResp) {
        axios.get(SERVER_STR+`/menus/${mid}`)
            .then(res => {
                const ans = res.data.menu;
                m = ans;
                console.log(res);
            });
    }

    static editMenuById(mid: number, m: MenuResp) {
        axios.put(SERVER_STR+`/menus/${mid}`, m)
            .then(res => {
                const ans = res.data.menu;
                m = ans;
                console.log(res);
            });
    }

    static deleteMenuById(mid: number) {
        axios.delete(SERVER_STR+`/menus/${mid}`)
            .then(res => {
                console.log(res);
            });
    }



}