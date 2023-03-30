import { Product } from "./Interface";

import AddProductForm from "./AddForm";
import EditProductForm from "./EditForm";
import { Table } from "reactstrap";
// Taking a prop which is passed down from Homepage
function ProductList(props: { data: any }){
    return(
        <div>
            <h1 className="display-5 mb-3">Current active projects: {props.data.length}</h1>

            <AddProductForm />

            <Table bordered responsive className="text-white mx-auto w-75">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Owner</th>
                        <th>Developers</th>
                        <th>Scrum Master</th>
                        <th>Start Date</th>
                        <th>Methdology</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.map((product: Product, index: number) => {
                        return <tr key={product.productId}>
                            <td className="col-2">{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.productOwnerName}</td>
                            <td>
                                <ul>
                                    {product.developers.map((dev) => (
                                        <li key={dev}>{dev}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{product.scrumMasterName}</td>
                            <td>{product.startDate}</td>
                            <td>{product.methodology}</td>
                            <td><EditProductForm data = {product.productId} /></td>
                        </tr>;
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductList;