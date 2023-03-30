import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";

export async function getServerSideProps() {
    const baseUrl = "http://localhost:3000/";
    const res = await fetch(baseUrl + 'api/products')
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

function HomePage({data}: any){
    return <ProductList data={data} />
}

export default HomePage;