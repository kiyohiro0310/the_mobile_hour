import React, { useState } from 'react';
import classes from "./admin.module.scss";
import { NextPage } from 'next';
import { AdminType, ChangeLogType, OrderAndOrderDetailType, Phone } from '../../Model/Types';
import AdminProfile from './admin-profile';
import AddProduct from './admin-add-product';
import UpdateProduct from './admin-update-product';
import ChangeLog from './admin-changelog';
import CreateAdmin from './admin-create-admin';
import Stock from './admin-stock';
import AdminList from './admin-list';
import AdminOrder from './admin-order';

interface Propstype {
  user: any;
  phones: Phone[];
  changeLogs: ChangeLogType[];
  admins: AdminType[];
  orders: OrderAndOrderDetailType[];
}

const AdminHome: NextPage<Propstype> = (props) => {
  const admin = props.user as AdminType;
  const [isAdminInfo, setIsAdminInfo] = useState(false);
  const [isAdminAddProduct, setIsAdminAddProduct] = useState(false);
  const [isAdminUpdateProduct, setIsAdminUpdateProduct] = useState(false);
  const [isStock, setIsStock] = useState(false);
  const [isAdminList, setIsAdminList] = useState(false);
  const [isChangeLog, setIsChangeLog] = useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  if(!admin.username) {
    return (
      <div>
        <h1>Access denied.</h1>
        <p>You are not authorized.</p>
      </div>
    )
  }

  function setAdminInfoHandler() {
    setIsAdminInfo(prevState => !prevState)
  }
  function setAdminAddProductHandler() {
    setIsAdminAddProduct(prevState => !prevState)
  }
  function setAdminUpdateProductHandler() {
    setIsAdminUpdateProduct(prevState => !prevState)
  }
  function setStockHandler() {
    setIsStock(prevState => !prevState)
  }
  function setAdminListHandler() {
    setIsAdminList(prevState => !prevState)
  }
  function setChangeLogHandler() {
    setIsChangeLog(prevState => !prevState)
  }
  function setCreateAdminHandler() {
    setIsCreateAdmin(prevState => !prevState)
  }
  function setOrderHandler() {
    setIsOrder(prevState => !prevState);
  }


  return (
    <div className={classes.home}>
      <h1>Administration Page</h1>
      <p>Login as <span onClick={setAdminInfoHandler}>{admin.username}</span></p>
      {isAdminInfo && (
        <div className={classes.info_container}>
          <p className={classes.info_container_close} onClick={setAdminInfoHandler}>
            close
          </p>
          <AdminProfile admin={admin} />
        </div>
    )}
      <div className={classes.admin_edit_list}>
        <p onClick={setAdminAddProductHandler}>Add product</p>
          {isAdminAddProduct && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setAdminAddProductHandler}>
                close
              </p>
              <AddProduct user={admin} changelogs={props.changeLogs} onSet={setAdminAddProductHandler}/>
            </div>
          )}
        <p onClick={setAdminUpdateProductHandler}>Edit product</p>
        {isAdminUpdateProduct && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setAdminUpdateProductHandler}>
                close
              </p>
              <UpdateProduct user={admin} changelogs={props.changeLogs} onSet={setAdminUpdateProductHandler}/>
            </div>
          )}
        <p onClick={setOrderHandler}>Orders</p>
        {isOrder && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setOrderHandler}>
                close
              </p>
              <h3>Orders</h3>
              <AdminOrder orders={props.orders}/>
            </div>
          )}

        <p onClick={setStockHandler}>Stock</p>
        {isStock && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setStockHandler}>
                close
              </p>
              <Stock phones={props.phones}/>
            </div>
          )}

        <p onClick={setChangeLogHandler}>View Changelog</p>
        {isChangeLog && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setChangeLogHandler}>
                close
              </p>
              <ChangeLog changeLogs={props.changeLogs}/>
            </div>
          )}
        <p onClick={setAdminListHandler}>Admin List</p>
        {isAdminList && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setAdminListHandler}>
                close
              </p>
              <AdminList admins={props.admins} onSet={setAdminListHandler}/>
            </div>
          )}
        <p onClick={setCreateAdminHandler}>Create admin</p>
        {isCreateAdmin && (
            <div className={classes.info_container}>
              <p className={classes.info_container_close} onClick={setCreateAdminHandler}>
                close
              </p>
              <CreateAdmin admins={props.admins} onSet={setCreateAdminHandler} />
            </div>
          )}

      </div>
    </div>
  )
}


export default AdminHome