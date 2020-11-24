import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './Menu.css';

interface MenuProps {
    myMenu: Dish[];
}

export default class Menu extends React.Component<MenuProps> {

    public constructor(props: MenuProps) {
        super(props);
    }

    getTable(data: Dish[]) {
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
                title: "Rating",
                field: "rating",
            },
        ];


        return <MaterialTable 
        data={data}
        columns={columns} 
        options={{ search: true, paging: true, pageSize:5, sorting: true, exportButton: false, showTitle: false }} 
        />
    }



    render() {
        return (
            <div>
                <hr style={{border: "2px solid #F1821B"}}></hr>
                <div className="menuTitle">Menu</div>
                <link 
                    rel="stylesheet" 
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                    <div style={{width:"80%", marginLeft:"10%", marginBottom:"50px"}}>
                      {this.getTable(this.props.myMenu)}
                    </div>

            </div>
        )
    }

}