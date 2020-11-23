import axios from 'axios';

export interface MenuResp {
    mid?: number;
    name: string;
}

export class MenuService {

    static createMenu(menu: MenuResp) {
        axios.post(`http://127.0.0.1:5000/menus`, menu)
            .then(res => {
                const ans = res.data.menu;
                menu = ans;
                console.log(res);
            });
    }

    static getAllMenus(menus: MenuResp[]) {
        axios.get(`http://127.0.0.1:5000/menus`)
            .then(res => {
                const ans = res.data.menus;
                menus = ans;
                console.log(res);
            });
    }

    static getMenuById(mid: number, m: MenuResp) {
        axios.get(`http://127.0.0.1:5000/menus/${mid}`)
            .then(res => {
                const ans = res.data.menu;
                m = ans;
                console.log(res);
            });
    }

    static editMenuById(mid: number, m: MenuResp) {
        axios.put(`http://127.0.0.1:5000/menus/${mid}`, m)
            .then(res => {
                const ans = res.data.menu;
                m = ans;
                console.log(res);
            });
    }

    static deleteMenuById(mid: number) {
        axios.delete(`http://127.0.0.1:5000/menus/${mid}`)
            .then(res => {
                console.log(res);
            });
    }



}