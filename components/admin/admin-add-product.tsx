import { NextPage } from 'next';
import React, { FormEvent, Fragment, useContext } from 'react'
import { AdminType, ChangeLogType, Feature, Phone } from '../../Model/Types';
import NotificationContext from '../provider/notification-context';
import classes from "./admin.module.scss";
import Router from "next/router";

const addNewProductHandler = async (product: Phone, feature: Feature) => {
  const response = await fetch("/api/product/add", {
    method: "POST",
    body: JSON.stringify({product, feature}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  if(!response.ok) {
    throw new Error("Something weng wrong.");
  }

  return data;
}

const addNewChangeLog = async (log: ChangeLogType) => {
  const response = await fetch("/api/admin/changelog", {
    method: "POST",
    body: JSON.stringify(log),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  if(!response.ok) {
    throw new Error("Something weng wrong.");
  }

  return data;
}

interface PropsType {
  user: AdminType;
  changelogs: ChangeLogType[];
  onSet: () => void;
}
const AddProduct: NextPage<PropsType> = (props) => {
  const admin = props.user;
  const changelogs = props.changelogs;
  const logID = changelogs.length + 1;

  const productNameRef = React.createRef<HTMLInputElement>();
  const productModelRef = React.createRef<HTMLInputElement>();
  const manufacturerRef = React.createRef<HTMLInputElement>();
  const priceRef = React.createRef<HTMLInputElement>();
  const stockRef = React.createRef<HTMLInputElement>();
  const featureRef = React.createRef<HTMLInputElement>();

  const weightRef = React.createRef<HTMLInputElement>();
  const dimensionsRef = React.createRef<HTMLInputElement>();
  const osRef = React.createRef<HTMLInputElement>();
  const screenSizeRef = React.createRef<HTMLInputElement>();
  const resolutionRef = React.createRef<HTMLInputElement>();
  const cpuRef = React.createRef<HTMLInputElement>();

  const ramRef = React.createRef<HTMLInputElement>();
  const storageRef = React.createRef<HTMLInputElement>();
  const batteryRef = React.createRef<HTMLInputElement>();
  const rearCameraRef = React.createRef<HTMLInputElement>();
  const frontCameraRef = React.createRef<HTMLInputElement>();

  const product_ID = Math.floor(Math.random() * Math.PI * 2383);
  const feature_ID = Math.floor(Math.random() * Math.PI / 2 * 1717);

  const notificationCtx = useContext(NotificationContext);

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    const enteredProductName = productNameRef.current!.value;
    const enteredProductModel = productModelRef.current!.value;
    const enteredManufacturer = manufacturerRef.current!.value;
    const enteredPrice = priceRef.current!.value;
    const enteredStock = stockRef.current!.value;
    const enteredFeatureID = featureRef.current!.value;

    const enteredWeight = weightRef.current!.value;
    const enteredDimensions = dimensionsRef.current!.value;
    const enteredOS = osRef.current!.value;
    const enteredScreenSize = screenSizeRef.current!.value;
    const enteredResolution = resolutionRef.current!.value;
    const enteredCPU = cpuRef.current!.value;

    const enteredRAM = ramRef.current!.value;
    const enteredStorage = storageRef.current!.value;
    const enteredBattery = batteryRef.current!.value;
    const enteredRearCamera = rearCameraRef.current!.value;
    const enteredFrontCamera = frontCameraRef.current!.value;


    const product: Phone = {
      id: String(product_ID),
      product_name: enteredProductName,
      product_model: enteredProductModel,
      manufacturer: enteredManufacturer,
      price: Number(enteredPrice),
      stock_on_hand: enteredStock,
      feature_id: Number(enteredFeatureID)
    }

    const feature: Feature = {
      id: Number(enteredFeatureID),
      weight: enteredWeight,
      dimensions: enteredDimensions,
      OS: enteredOS,
      screensize: enteredScreenSize,
      resolution: enteredResolution,
      CPU: enteredCPU,
      RAM: enteredRAM,
      storage: enteredStorage,
      battery: enteredBattery,
      rear_camera: enteredRearCamera,
      front_camera: enteredFrontCamera
    }

    const date = new Date();
    const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    const log: ChangeLogType = {
      id: String(logID),
      date_created: today,
      date_last_modified: today,
      user_id: String(admin.id),
      product_id: String(product.id),
      action: `Create ${product.id} ${product.product_name}`
    }

    const data = await addNewProductHandler(product, feature);

    if(data.error) {
      notificationCtx.showNotification({
        title: "Error",
        message: "Couldn't add product. Maybe duplicate featureID. Close it and try again.",
        status: "error"
      })
    }else{
      notificationCtx.showNotification({
        title: "Success",
        message: "Add new product successfully.",
        status: "success"
      });
      await addNewChangeLog(log);
      props.onSet();
      Router.replace("/admin");
    }

  }

  return (
    <Fragment>
      <div className={classes.add_product}>
        <h3>Product <span>Detail</span></h3>
        <form onSubmit={submitHandler}>
          <div className={classes.product_detail}>
            <div>
              <label htmlFor="product_name">Product Name:</label>
              <input type="text" name='product_name' required ref={productNameRef}/>
            </div>
            <div>
              <label htmlFor="product_model">Product Model:</label>
              <input type="text" name='product_model' required ref={productModelRef}/>
            </div>
            <div>
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input type="text" name='manufacturer' required ref={manufacturerRef}/>
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="text" name='price' required ref={priceRef}/>
            </div>
            <div>
              <label htmlFor="stock">Stock:</label>
              <input type="text" name='stock' required ref={stockRef}/>
            </div>
            <div>
              <label htmlFor="feature">Feature ID:</label>
              <input type="text" name='feature' defaultValue={feature_ID} required ref={featureRef} disabled/>
            </div>

          </div>
          <h3>Product <span>Feature</span></h3>
          <div className={classes.product_detail}>
            <div>
              <label htmlFor="feature">Feature ID:</label>
              <input type="text" name='feature' defaultValue={feature_ID} required ref={featureRef} disabled/>
            </div>
            <div>
              <label htmlFor="weight">Weight:</label>
              <input type="text" name='weight' required ref={weightRef}/>
            </div>
            <div>
              <label htmlFor="dimensions">Dimensions:</label>
              <input type="text" name='dimensions' required ref={dimensionsRef}/>
            </div>
            <div>
              <label htmlFor="os">OS:</label>
              <input type="text" name='os' required ref={osRef}/>
            </div>
            <div>
              <label htmlFor="screensize">Screen Size:</label>
              <input type="text" name='screensize' required ref={screenSizeRef}/>
            </div>
            <div>
              <label htmlFor="resolution">Resolution:</label>
              <input type="text" name='resolution' required ref={resolutionRef}/>
            </div>
            <div>
              <label htmlFor="cpu">CPU:</label>
              <input type="text" name='cpu' required ref={cpuRef}/>
            </div>
            <div>
              <label htmlFor="ram">RAM:</label>
              <input type="text" name='ram' required ref={ramRef}/>
            </div>
            <div>
              <label htmlFor="storage">Storage:</label>
              <input type="text" name='storage' required ref={storageRef}/>
            </div>
            <div>
              <label htmlFor="battery">Battery:</label>
              <input type="text" name='battery' required ref={batteryRef}/>
            </div>
            <div>
              <label htmlFor="rear_camera">Rear Camera:</label>
              <input type="text" name='rear_camera' required ref={rearCameraRef}/>
            </div>
            <div>
              <label htmlFor="front_camera">Front Camera:</label>
              <input type="text" name='front_camera' required ref={frontCameraRef}/>
            </div>
          </div>
          <div>
            <input type="submit" value="Add" className={classes.submit} />
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default AddProduct