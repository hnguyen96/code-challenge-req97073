import { Product } from '@/components/products/Interface';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: JSON
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) 
{ 
  let products = require('../../../json/data.json');
  let msg;
  const fs = require('fs');

  if(req.method === "GET"){
    res.status(200).json(products)
  } 
  else if (req.method === "POST"){
    let newProduct = JSON.parse(req.body);

    products.push(newProduct);

    fs.writeFileSync('json/data.json', JSON.stringify(products, null, 4));
    
    msg = '{"status":"Product added!"}';
    res.status(201).json(JSON.parse(msg));
  } else if(req.method === "PATCH"){
        
    let editedProduct: Product = JSON.parse(req.body);

    //This new products array will contain the updated information
    const newProducts = products.map((product: Product) => {
        if(product.productId == editedProduct.productId){
            return {
              ...product,
              productName: editedProduct.productName,
              productOwnerName: editedProduct.productOwnerName,
              scrumMasterName: editedProduct.scrumMasterName,
              developers: editedProduct.developers,
              startDate: editedProduct.startDate,
              methodology: editedProduct.methodology,
            };
        }

        return {...product};
    })

    products = newProducts;
    fs.writeFileSync('json/data.json', JSON.stringify(products, null, 4));
    
    msg = '{"status":"Product updated!"}';
    res.status(201).json(JSON.parse(msg));

}
}