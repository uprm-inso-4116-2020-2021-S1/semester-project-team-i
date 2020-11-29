import axios from 'axios';

export interface Dish {
    did?: number;
    category_id: number;
    establishment_id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    rating: number;
    type: string;
}

export class DishService {

    static createDish(dish: Dish) {
        axios.post(`http://127.0.0.1:5000/dishes`, dish)
            .then(res => {
                const ans = res.data.dish;
                dish = ans;
                console.log("estoy en res")
                console.log(res);
            });
    }

    static getAllDishes(dishes: Dish[]) {
        axios.get(`http://127.0.0.1:5000/dishes`)
        .then(res => {
            const ans = res.data.dishes;
            dishes = ans;
            console.log(res);
        });
    }

    static getDishById(mid: number, d: Dish) {
        axios.get(`http://127.0.0.1:5000/dishes/${mid}`)
            .then(res => {
                const ans = res.data.menu;
                d = ans;
                console.log(res);
            });
    }

    static editDishById(did: number, m: Dish) {
        axios.put(`http://127.0.0.1:5000/dishes/${did}`, m)
            .then(res => {
                const ans = res.data.menu;
                m = ans;
                console.log(res);
            });
    }

    static deleteDishById(did: number) {
        axios.delete(`http://127.0.0.1:5000/dishes/${did}`)
            .then(res => {
                console.log(res);
            });
    }
    static getTop4Dishes(dishes: Dish[]) {
        axios.get(`http://127.0.0.1:5000/dishes?topRated=true&limit=4`)
        .then(res => {
            const ans = res.data.dishes;
            dishes = ans;
            console.log(res);
        });
    }
}