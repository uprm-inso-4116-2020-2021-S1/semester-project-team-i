import MaterialTable from 'material-table';
import React from 'react';
import { Dish } from '../Restaurant/Restaurant';
import './RestManager.css';
import { CreateDish } from '../CreateDish/CreateDish';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SERVER_STR } from '../Login/Login';
import { SampleMenu } from '../Menu/Menu';


interface RestManagerProps extends RouteComponentProps<{ eid: string }> {

}

interface RestManagerStates {
    data: SampleMenu[];
}

export default class RestManager extends React.Component<RestManagerProps, RestManagerStates> {
    private imgStr = "";
    private establishmentID = this.props.match.params.eid as unknown as number;

    public constructor(props: RestManagerProps) {
        super(props);
        console.log(props.match.params.eid);
        this.state = {
            data: []
        }
        this.setBackImg();
        this.populateTable();
    }

    async setBackImg() {
        await axios.get(SERVER_STR + `/establishments/${this.establishmentID}`)
            .then(res => {
                const ans = res.data.establishment;
                this.imgStr = ans.image_url;
                console.log(ans);
            });
    }

    async populateTable() {
        await axios.get(SERVER_STR + `dishes?eid=${this.establishmentID}`)
            .then(res => {
                const ans: Dish[] = res.data.dishes;       
                const sMenu: SampleMenu[] = [];
                ans.forEach(item => {
                    console.log(item);
                    const temp: SampleMenu = {
                        name: item.name,
                        description: item.description,
                        category: item.category?.name as string,
                        type: item.type,
                        price: "$" + item.price,
                        upvotes: item.upvotes?.length ? item.upvotes.length : 0
                    }
                    sMenu.push(temp);
                })
                this.setState({
                    data: sMenu
                })
                console.log(ans);
            });
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
                                const index = data.indexOf(oldData as SampleMenu);
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
            <div className="atras" style={{
                background: `linear-gradient(to top, rgba(255,255,255,1) 5%,
                rgba(255,255,255,0)), url(${this.imgStr})`
            }}>
                <br />
                <div />
                <div className="menosEspacio" style={{ display: 'table-row' }}>
                    <table>
                        <tr>
                            <td>
                                <div className="recuadro">
                                    <div className="managerTitle" style={{ fontWeight: "bold", width: "100%", }}>Restaurant Manager</div>
                                </div>
                            </td>
                            <td>
                                <div className="boton" style={{}}>
                                    <Link to={`/restaurant/${this.establishmentID}`} style={{ textDecoration: "inherit", color: "white" }}>Restaurant</Link>
                                </div>
                            </td>
                            <td>
                                <div className="press" style={{ display: 'table-cell' }}>
                                    <CreateDish establishmentId={this.establishmentID}></CreateDish>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <div className="color" style={{ width: "90%", marginBottom: "50px", marginTop: "75px", marginLeft: "20px" }}>
                    {this.getTable([...this.state.data])}
                </div>
            </div>
        )
    }

}