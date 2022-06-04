import { NextPage } from 'next';
import React from 'react'
import classes from "./admin.module.scss";
import { OrderAndOrderDetailType } from '../../Model/Types';

interface PropsType {
  orders: OrderAndOrderDetailType[];
}
const AdminOrder: NextPage<PropsType> = (props) => {
  const orders = props.orders;
  return (
    <div className={classes.change_container}>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date of order</th>
            <th>Delivery date</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Model</th>

            <th>Manufacturer</th>
            <th>Price</th>
            <th>Stock on hand</th>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>

            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Postcode</th>
            <th>State</th>
          </tr>
        </thead>

          {orders.map(order => (
            <tbody key={String(order.order_number)}>
              <tr>
                <td>{String(order.order_number)}</td>
                <td>{order.order_date}</td>
                <td>{order.order_delivery_date}</td>
                <td>{order.product_id}</td>
                <td>{order.product_name}</td>
                <td>{order.product_model}</td>

                <td>{order.manufacturer}</td>
                <td>{String(order.price)}</td>
                <td>{String(order.stock_on_hand)}</td>
                <td>{String(order.customer_id)}</td>
                <td>{order.firstname}</td>
                <td>{order.lastname}</td>

                <td>{order.phone}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.city}</td>
                <td>{String(order.postcode)}</td>
                <td>{order.state}</td>

              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default AdminOrder