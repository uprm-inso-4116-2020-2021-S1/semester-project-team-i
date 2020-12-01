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
    private establishmentID = this.props.match.params.eid as unknown as number;

    public constructor(props: RestManagerProps) {
        super(props);
        console.log(props.match.params.eid);
        this.state = {
            data: []
        }
        this.populateTable();
    }

    async populateTable() {
        await axios.get(`http://127.0.0.1:5000/dishes?eid=${this.establishmentID}`)
            .then(res => {
                const ans = res.data.dishes;
                this.setState({
                    data: JSON.parse(JSON.stringify(ans))
                })
                console.log(ans);
            });
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
                field: "category_id",
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
        console.log("CURR STATE");
        console.log(this.state.data);
        return (
            <div className= "atras" style={{ marginLeft: "10%", marginTop: "7%" }}>
                <div style={{ marginBottom: "100px" }} />
                <div style={{ display: 'table-row' }}>
                    <div className="managerTitle" style={{ display: 'table-cell' }}>Restaurant Manager</div>
                    <div style={{ display: 'table-cell' }}>
                        <CreateDish establishmentId={this.establishmentID}></CreateDish>
                    </div>
                </div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <div style={{ width: "90%", marginBottom: "50px", marginTop: "75px", marginLeft: "20px" }}>
                    {this.getTable([...this.state.data])}
                </div>
            </div>
        )
    }

}