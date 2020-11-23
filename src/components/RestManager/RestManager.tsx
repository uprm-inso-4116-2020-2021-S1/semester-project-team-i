import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './RestManager.css';
import img1 from '../../assets/plate1.png';


interface RestManagerProps {
    myMenu: Dish[];
}

interface RestManagerStates {
    data: Dish[];
}

export default class RestManager extends React.Component<RestManagerProps, RestManagerStates> {

    public constructor(props: RestManagerProps) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'pancakes',
                    price: 10,
                    description: 'helloooo',
                    category: 'breakfast',
                    imageUrl: img1,
                    rating: 200,
                    type: 'entree'
                },
                {
                    name: 'pancakes',
                    price: 10,
                    description: 'helloooo',
                    category: 'breakfast',
                    imageUrl: img1,
                    rating: 200,
                    type: 'entree'
                },
                {
                    name: 'pancakes',
                    price: 10,
                    description: 'helloooo',
                    category: 'breakfast',
                    imageUrl: img1,
                    rating: 200,
                    type: 'drinks'
                },
                {
                    name: 'pancakes',
                    price: 10,
                    description: 'helloooo',
                    category: 'breakfast',
                    imageUrl: img1,
                    rating: 200,
                    type: 'entree'
                },
                {
                    name: 'pancakes',
                    price: 10,
                    description: 'helloooo',
                    category: 'breakfast',
                    imageUrl: img1,
                    rating: 200,
                    type: 'dessert'
                }
            ],
        }
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
        editable={{
            isEditable: _rowData => true,
            isDeletable: _rowData => true,
            isDeleteHidden:  _rowData =>false,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    const index = data.indexOf(oldData as Dish);
                    data[index] = newData;
                    this.setState({ data }, () => resolve());
                  }
                  resolve()
                }, 1000)
              }),
          }}
        
        />
    }



    render() {
        return (
            <div>
                <div style={{marginBottom:"100px"}}/>
                <span className="managerTitle">Restaurant Manager</span>
                <link 
                    rel="stylesheet" 
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                    <div style={{width:"90%", marginLeft:"5%", marginBottom:"50px", marginTop:"30px"}}>
                      {this.getTable([... this.state.data])}
                    </div>

            </div>
        )
    }

}