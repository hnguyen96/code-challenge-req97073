import { useState, useEffect } from 'react';
import { Product } from "./Interface";
import { useRouter } from 'next/router';
//Using UUID v4 to generate unique ID
import { v4 as uuid } from 'uuid';
import { 
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input, InputGroup, FormText
} from 'reactstrap';

export default function EditProductForm(props: {data: any}) {
    const router = useRouter()
    
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData ] = useState({
        productId: "",
        productName: "",
        productOwnerName: "",
        scrumMasterName: "",
        developers: [] as string[],
        startDate: "",
        methodology: "",
    }) ;

    //Using seperate state to handle developers array
    const [devName, setDevName] = useState('');
    const [devs, setDevs] = useState<string[]>([]);

    async function getProductData(pid: string) {
        const url = 'http://localhost:3000/api/products/' + pid;
        const res = await fetch(url);
        const data = await res.json();
        
        setFormData({
            productId: data.productId,
            productName: data.productName,
            productOwnerName: data.productOwnerName,
            scrumMasterName: data.scrumMasterName,
            developers: data.developers,
            startDate: data.startDate,
            methodology: data.methodology,
        })

        setDevs(data.developers);
    }

    const formToggle = () => {
        //Fetch the data first then open form
        //On form open, it will be populated with the current selected product data
        if(formOpen == false){
            getProductData(props.data);
        }
        setFormOpen(!formOpen);
        setDevs([]);
    };
    
    //Getting form values
    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    //Handling form submission
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        //Create a new product based on the form data
        const editedProduct = {} as Product;
        
        //Since we are updating the id stays the same
        editedProduct.productId = formData.productId;
        editedProduct.productName = formData.productName;
        editedProduct.productOwnerName = formData.productOwnerName;
        editedProduct.developers = devs;
        editedProduct.scrumMasterName = formData.scrumMasterName;
        editedProduct.startDate = formData.startDate;
        editedProduct.methodology = formData.methodology;

        const res = await fetch('api/products',{
            method: "PATCH",
            body: JSON.stringify(editedProduct)
        });

        router.reload();
    }
    return (
        <div>
            <Button className='p-0 me-2' color="white" onClick={formToggle} data-toggle="tooltip" data-placement="top" title="Edit this product">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </Button>

            <Modal animation="false" isOpen={formOpen} toggle={formToggle} size="lg" centered>
                <form onSubmit={handleSubmit} method='POST'>
                    <ModalHeader className='text-dark' toggle={formToggle}>Edit product</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="productName" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Product Name</span>
                            </Label>
                            <Input id="productName" name="productName" type="text" onChange={handleChange} value={formData.productName} required />

                            <Label for="productOwnerName" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Owner</span>
                            </Label>
                            <Input id="productOwnerName" name="productOwnerName" type="text" onChange={handleChange} value={formData.productOwnerName} required />

                            <Label for="productOwner" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Scrum Master</span>
                            </Label>
                            <Input id="scrumMasterName" name="scrumMasterName" type="text" onChange={handleChange} value={formData.scrumMasterName} required />
                            
                            <Label for="developers" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Add developers</span>
                            </Label>
                            <InputGroup>
                                <Input id="developers" type='text' onChange={e => setDevName(e.target.value)} />
                                
                                <Button onClick={() => {
                                    const devInput = document.getElementById('developers');
                                    if(devs.length <= 4){         
                                        setDevs([...devs, devName])
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
                                    <Input id="startDate" name="startDate" type="date" max="2023-12-31" value={formData.startDate} onChange={handleChange}/>
                                </FormGroup>
                            </div>

                            <div className='col'>
                                <FormGroup>
                                    <Label for="methodology" className='mb-0 mt-2'>
                                        <span className='h6 small text-muted'>Methodology</span>
                                    </Label>
                                    <select id="methodology" name="methodology" className="form-select" value={formData.methodology} onChange={handleChange}>
                                        <option value="Agile">Agile</option>
                                        <option value="Waterfall">Waterfall</option>
                                    </select>
                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type='submit'>
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}