import { useState } from 'react';
import { Product } from "./Interface";
import { useRouter } from 'next/router';
//Using UUID v4 to generate unique ID
import { v4 as uuid } from 'uuid';

import { 
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input, InputGroup, FormText
} from 'reactstrap';

export default function addProductForm() {
    const router = useRouter()
    
    const [formOpen, setFormOpen] = useState(false);
    //Using seperate state to handle developers array
    const [devName, setDevName] = useState('');
    const [devs, setDevs] = useState<string[]>([]);
    
    const formToggle = () => {
        setFormOpen(!formOpen);
        setDevs([]);
    };

    const [formData, setFormData ] = useState({
        productId: "",
        productName: "",
        productOwnerName: "",
        scrumMasterName: "",
        Developers: [],
        startDate: "",
        methodology: "",
    });

    //Getting form values
    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    //Handling form submission
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        //Create a new product based on the form data
        const newProduct = {} as Product;

        //Since we are creating, we generate a new id.
        newProduct.productId = uuid();
        newProduct.productName = formData.productName;
        newProduct.productOwnerName = formData.productOwnerName;
        newProduct.developers = devs;
        newProduct.scrumMasterName = formData.scrumMasterName;
        newProduct.startDate = formData.startDate;

        console.log(formData.methodology);
        newProduct.methodology = formData.methodology;

        const res = await fetch('api/products',{
            method: "POST",
            body: JSON.stringify(newProduct)
        });

        router.reload();
    }
    return (
        <div>
            <Button className='me-2' color="success" onClick={formToggle} data-toggle="tooltip" data-placement="top" title="Add a product">
                Add a product
            </Button>

            <Modal animation="false" isOpen={formOpen} toggle={formToggle} size="lg" centered>
                <form onSubmit={handleSubmit} method='POST'>
                    <ModalHeader toggle={formToggle}>Add product</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="productName" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Product Name</span>
                            </Label>
                            <Input id="productName" name="productName" type="text" onChange={handleChange} required />

                            <Label for="productOwnerName" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Owner</span>
                            </Label>
                            <Input id="productOwnerName" name="productOwnerName" type="text" onChange={handleChange} required />

                            <Label for="productOwner" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Scrum Master</span>
                            </Label>
                            <Input id="scrumMasterName" name="scrumMasterName" type="text" onChange={handleChange} required />
                            
                            <Label for="developers" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Add developers</span>
                            </Label>
                            <InputGroup>
                                <Input id="developers" type='text' onChange={e => setDevName(e.target.value)} />
                                
                                <Button onClick={() => {
                                    const devInput = document.getElementById('developers');
                                    if(devs.length <= 4){         
                                        setDevs([...devs, devName]);
                                    }
                                }}>
                                    Add
                                </Button>
                            </InputGroup>
                            <FormText>Cannot exceed 5 developers per project. ({devs.length} developers added)</FormText>
                        </FormGroup>
                        
                        <ul className='text-dark'>
                            {devs.map(dev => (
                                <li key={dev}>
                                    <div className='d-flex pb-2'>
                                        <div className='flex-grow-1'>{dev}</div>
                                        
                                        <div className='align-items-right'>
                                            <Button size='sm' onClick={() => {
                                                setDevs(
                                                    devs.filter(d =>
                                                        d !== dev
                                                    )
                                                );
                                                }}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className='row'>
                            <div className='col'>
                                <FormGroup>
                                    <Label for="startDate" className='mb-0 mt-2'>
                                        <span className='h6 small text-muted'>Start Date</span>
                                    </Label>
                                    <Input id="startDate" name="startDate" type="date" max="2023-12-31" onChange={handleChange}/>
                                </FormGroup>
                            </div>

                            <div className='col'>
                                <FormGroup>
                                    <Label for="methodology" className='mb-0 mt-2'>
                                        <span className='h6 small text-muted'>Methodology</span>
                                    </Label>
                                    <select id="methodology" name="methodology" className="form-select" onChange={handleChange}>
                                        <option value="">...</option>
                                        <option value="Agile">Agile</option>
                                        <option value="Waterfall">Waterfall</option>
                                    </select>
                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type='submit'>
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}