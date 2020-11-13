import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './Menu.css';

interface MenuProps {
    myMenu: Dish[];
}

// const MenuItem = (props: { dish: Dish }): JSX.Element => {
//     return <div className="dishRect">
//         <span>
//             <img alt="pic" className="dishImage" src={props.dish.imageUrl}></img>
//         </span>
//         <span className="dishName">
//             {props.dish.name}
//         </span>
//         <span className="dishPrice">
//             ${props.dish.price}
//         </span>

//     </div>
// }

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
                {/* {this.props.myMenu.map((dish: Dish) => {
                    return <MenuItem dish={dish}></MenuItem>
                })} */}

            </div>
        )
    }

}