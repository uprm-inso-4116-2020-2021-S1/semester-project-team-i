import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './Menu.css';

interface MenuProps {
    myMenu: Dish[];
}

export interface SampleMenu {
    name: string;
    description: string;
    category: string;
    type: string;
    price: string;
    upvotes: number;
}

export default class Menu extends React.Component<MenuProps> {

    public constructor(props: MenuProps) {
        super(props);
    }

    getTable(data: SampleMenu[]) {
        const columns = [
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Description",
                field: "description",
            },
            {
                title: "Category",
                field: "category",
            },
            {
                title: "Type",
                field: "type",
            },
            {
                title: "Price",
                field: "price",
            },
            {
                title: "Upvotes",
                field: "upvotes",
            },
        ];


        return <MaterialTable 
        data={data}
        columns={columns} 
        options={{ search: true, paging: true, pageSize:5, sorting: true, exportButton: false, showTitle: false }} 
        />
    }



    render() {
        const sMenu: SampleMenu[] = [];
        this.props.myMenu.forEach(item => {
            console.log(item);
            const temp: SampleMenu = {
                name: item.name,
                description: item.description,
                category: item.category?.name as string,
                type: item.type,
                price: "$"+item.price,
                upvotes: item.upvotes?.length ? item.upvotes.length : 0
            }
            sMenu.push(temp);
        })

        return (
            <div>
                <hr style={{border: "2px solid #F1821B"}}></hr>
                <div className="menuTitle">Menu</div>
                <link 
                    rel="stylesheet" 
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                    <div style={{width:"80%", marginLeft:"10%", marginBottom:"50px"}}>
                      {this.getTable(sMenu)}
                    </div>

            </div>
        )
    }

}