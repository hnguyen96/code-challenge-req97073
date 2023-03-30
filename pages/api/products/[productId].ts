import { Product } from '@/components/products/Interface';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: JSON
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let products = require('../../../json/data.json');
    const pid = req.query.productId;

    let result = products.find((product: Product) => {
        return product.productId == pid;
    });

    res.status(200).json(result);
}