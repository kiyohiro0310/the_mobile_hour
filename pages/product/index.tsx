import React, { FormEvent, useState } from 'react'
import classes from "../../components/product/product.module.scss";
import ProductList from '../../components/product/product-list';
import { GetStaticProps, NextPage } from 'next';
import { Phone } from '../../Model/Types';
import { findAllPhones } from '../../lib/db';

interface PropsType {
    phones: string
}
const Product: NextPage<PropsType> = (props) => {
    const [category, setCategory] = useState("all");
    const phones = JSON.parse(props.phones) as Phone[];

    const selectBrandRef = React.createRef<HTMLSelectElement>();

    let featuredPhones: Phone[] = [];

    if(category !== "all"){
        phones.map(phone => {
            if(phone.product_model === category){
                featuredPhones.push(phone);
            }
        })
    }else {
        phones.map(phone => {
            featuredPhones.push(phone);
        })
    }

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        const selectedValue = selectBrandRef.current!.value;
        setCategory(selectedValue);
    }

  return (
    <div className={classes.main}>
        <h1>Product List</h1>
        <p>Find your favourite.</p>
        <div className={classes.category_form}>
            <form onSubmit={submitHandler}>
                <label htmlFor="phone_category">Category: </label>
                <select name="phone_category" id="phone_category" ref={selectBrandRef}>
                    <option value="all">all</option>
                    <option value="iphone">iPhone</option>
                    <option value="xiaomi">Xiaomi</option>
                    <option value="sumsung">Sumsung</option>
                    <option value="gpixel">GPixel</option>
                </select>

                <input type="submit" value="Search" />
            </form>
        </div>
        <ProductList phones={featuredPhones}/>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await findAllPhones();
    const phones = JSON.stringify(data);

    return {
        props: {
            phones: phones
        }
    }
}
export default Product;