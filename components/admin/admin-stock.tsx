import { NextPage } from 'next'
import React, { Fragment } from 'react'
import { Phone } from '../../Model/Types'
import classes from "./admin.module.scss";

interface PropsType {
  phones: Phone[]
}

const Stock: NextPage<PropsType> = (props) => {
  const phones = props.phones;

  return (
    <div className={classes.change_container}>
      <table>
        <caption>
          <h3>Stock</h3>
        </caption>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Product Model</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>

          {phones.map(phone => (
            <tbody key={String(phone.id)}>
              <tr>
                <td>{String(phone.id)}</td>
                <td>{phone.product_name}</td>
                <td>{phone.product_model}</td>
                <td>{phone.manufacturer}</td>
                <td>{Number(phone.price)}</td>
                <td>{Number(phone.stock_on_hand)}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default Stock