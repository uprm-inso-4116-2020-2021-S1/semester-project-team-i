import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './RestManager.css';
import { CreateDish } from '../CreateDish/CreateDish';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';


interface RestManagerProps extends RouteComponentProps<{ eid: string }> {

}

interface RestManagerStates {
    data: Dish[];
}

export default class RestManager extends React.Component<RestManagerProps, RestManagerStates> {

    public constructor(props: RestManagerProps) {
        super(props);
        console.log(props.match.params.eid);
        this.state = {
            data: []
        }
        axios.get(`http://127.0.0.1:5000/dishes?eid=${props.match.params.eid}`)
        .then(res => {
            const ans = res.data.dishes;
            this.state = {
                data: ans
            }
            console.log(res);
        });
        // this.state = {
        //     data: [
        //         {
        //             name: 'pancakes',
        //             price: '$10',
        //             description: 'with fruits and whipped cream',
        //             category: 'breakfast',
        //             imageUrl: img1,
        //             rating: 123,
        //             type: 'entree'
        //         },
        //         {
        //             name: 'french toast',
        //             price: '$11',
        //             description: "chef's special",
        //             category: 'breakfast',
        //             imageUrl: img1,
        //             rating: 87,
        //             type: 'entree'
        //         },
        //         {
        //             name: 'fruit salad',
        //             price: '$6',
        //             description: 'fruits of the day',
        //             category: 'snacks',
        //             imageUrl: img1,
        //             rating: 100,
        //             type: 'snacks'
        //         },
        //         {
        //             name: 'açai',
        //             price: '$12',
        //             description: 'vegan',
        //             category: 'snacks',
        //             imageUrl: img1,
        //             rating: 138,
        //             type: 'entree'
        //         },
        //         {
        //             name: 'turkey sandwich',
        //             price: '$9',
        //             description: 'sandwich',
        //             category: 'breakfast',
        //             imageUrl: img1,
        //             rating: 200,
        //             type: 'entree'
        //         }
        //     ],
        // }
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
            options={{ search: true, paging: true, pageSize: 5, sorting: true, exportButton: false, showTitle: false }}
            editable={{
                isEditable: _rowData => true,
                isDeletable: _rowData => true,
                isDeleteHidden: _rowData => false,
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
            // <div className="container">
                <div style={{ marginLeft: "10%", marginTop:"7%" }}>
                    <div style={{ marginBottom: "100px" }} />
                    <div style={{ display: 'table-row' }}>
                        <div className="managerTitle" style={{ display: 'table-cell' }}>Restaurant Manager</div>
                        <div style={{ display: 'table-cell' }}>
                            <CreateDish establishmentId={this.props.match.params.eid as unk number}></CreateDish>
                        </div>
                    </div>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                    <div style={{ width: "90%", marginBottom: "50px", marginTop: "75px", marginLeft: "20px"}}>
                        {this.getTable([...this.state.data])}
                    </div>
                </div>
            // </div>
        )
    }

}