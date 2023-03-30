import { Product } from "./Interface";
import { useState } from "react";
import AddProductForm from "./AddForm";
import EditProductForm from "./EditForm";
import { Table, Input, Label, FormGroup } from "reactstrap";


// Taking a prop which is passed down from Homepage
function ProductList(props: { data: any }){
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('');

    return(
        <div>
            <h1 className="display-5 mb-3">Current active projects: {props.data.length}</h1>
            <div className="mx-auto w-75">
                <FormGroup className="w-75 mx-auto mb-5">
                    <div className="row align-items-end justify-content-between">  
                        <div className="col-4">                    
                            <Label for="searchType" className='mb-0 mt-2'>
                                <span className='small text-white'>You are searching for..</span>
                            </Label>
                            
                            <Input id="searchType" name ="searchType" type="select" value={searchType} onChange={event => {setSearchType( event.target.value ); console.log(searchType)}}>
                                <option value="scrum">
                                    Scrum Master
                                </option>

                                <option value="dev">
                                    Developer
                                </option>
                            </Input>
                        </div>  

                        <div className="col">  
                            <Label for="searchName" className='mb-0 mt-2'>
                                <span className='small text-white'>Enter a name</span>
                            </Label>

                            <Input id="searchName" name =" searchName" placeholder="Name.." required value={searchName} onChange={event => {setSearchName( event.target.value ); ; console.log(searchName)}}/>
                        </div>

                        <div className="col-auto">
                            <AddProductForm />
                        </div>
                    </div>
                </FormGroup>

                <Table bordered responsive className="text-white">
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
                        {props.data
                        //Take data and filter it based on type and the name user is searching for
                        .filter((product: Product) => {
                            if(searchName !== "" && searchType =="scrum"){
                                //Filter for scrumMaster
                                let scrumName = product.scrumMasterName;
                        
                                if (scrumName.toLowerCase().includes(searchName.toLowerCase())){
                                    return product
                                } 
                            } else if (searchName !== "" && searchType == "dev") {
                                //Filter for developerS
                                for( let i = 0; i < product.developers.length; i++){
                                    if(product.developers[i].toLowerCase().includes(searchName.toLowerCase())){
                                        return product;
                                    }
                                }
                            } else {
                                return product;
                            }
                        })
                        .map((product: Product, index: number) => {
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
        </div>
    );
}

export default ProductList;