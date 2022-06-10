import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { FormEvent, Fragment, useContext, useEffect, useState } from 'react'
import { AdminType, ChangeLogType, Feature, Phone } from '../../Model/Types';
import NotificationContext from '../provider/notification-context';
import classes from "./admin.module.scss";

const updateProductHandler = async (product: Phone, feature: Feature) => {
  const response = await fetch("/api/product/update", {
    method: "PATCH",
    body: JSON.stringify({product, feature}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  if(!response.ok) {
    throw new Error("Something went wrong.");
  }

  return data;
}

const searchProductHandler = async (product_id: string) => {
  const response = await fetch("/api/product/find", {
    method: "POST",
    body: JSON.stringify({product_id}),
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
    throw new Error("Something went wrong.");
  }

  return data;
}


interface PropsType {
  user: AdminType;
  changelogs: ChangeLogType[];
  onSet: () => void;
}

const UpdateProduct: NextPage<PropsType> = (props) => {
  const admin = props.user;
  const changelogs = props.changelogs;
  const logID = changelogs.length + 1;

  const [isResult, setIsResult] = useState(false);
  const [product, setProduct] = useState<Phone>();
  const [feature, setFeature] = useState<Feature>();
  const [isDelete, setIsDelete] = useState(false);
  const [logs, setLogs] = useState<any>([]);

  const router = useRouter();

  const productIDRef = React.createRef<HTMLInputElement>();
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

  const notificationCtx = useContext(NotificationContext);

  function setDeleteHandler() {
    setIsDelete(prevState => !prevState);
}

function deleteHandler() {
    fetch("/api/product/delete", {
        method: "POST",
        body: JSON.stringify(product!.id),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Something went wrong");
        }
        res.json()
    })
    .then(data => {

    })
    setIsDelete(prevState => !prevState);
    notificationCtx.showNotification({
        title: "Success",
        message: "Delete account successfully.",
        status: "success"
    })
    router.replace("/admin");
}

  async function submitSearchHandler(e: FormEvent) {
    e.preventDefault();
    const enteredProductID = productIDRef.current!.value;

    const data = await searchProductHandler(enteredProductID);

    if(!data) {
      setIsResult(false);
    }else {
      setProduct(data.product);
      setFeature(data.feature);
      setIsResult(true);
    }
  }

  async function submitUpdateHandler(e: FormEvent) {
    e.preventDefault();
    const enteredID = productIDRef.current!.value;
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
      id: String(enteredID),
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
    setLogs(changelogs);
    const date = new Date();
    const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    let date_created: string[] = [];

    changelogs.map(log => {
      if(log.product_id == product.id) {
        date_created.push(log.date_created);
      }
    });

    const log: ChangeLogType = {
      id: String(logID),
      date_created: date_created[0],
      date_last_modified: today,
      user_id: String(admin.id),
      product_id: String(product.id),
      action: `Update product id:${product.id} ${product.product_name}`
    }
    const data = await updateProductHandler(product, feature)

    if(data.error) {
      notificationCtx.showNotification({
        title: "Error",
        message: "Couldn't Update product.",
        status: "error"
      })
    }else{
      notificationCtx.showNotification({
        title: "Success",
        message: "Update product successfully.",
        status: "success"
      });
      await addNewChangeLog(log);
      props.onSet();
      Router.replace("/admin");
    }
  }

  return (
    <Fragment>
    {!isResult && (
      <>
        <div className={classes.add_product}>
          <h3><span>Search</span> Product</h3>
          <form onSubmit={submitSearchHandler}>
            <div className={classes.product_detail}>
              <div className={classes.search_product}>
                <label htmlFor="product_id">Product ID:</label>
                <input type="text" name='product_id' required ref={productIDRef} pattern="[0-9]*"/>
                <span className={classes.input_validation}>Invalid input.</span>
              </div>
              <div>
                <input type="submit" value="Search" className={classes.submit} />
              </div>
            </div>
          </form>
        </div>
      </>
        )}
        {isResult && (
          <>
    {isDelete && (
            <div className={classes.delete_container}>
                <div className={classes.delete_confirm}>
                    <h1>Delete Product?</h1>
                    <div className={classes.delete_boxes}>
                        <div>
                            <h3>Product ID:</h3>
                            <p>{product?.id}</p>
                        </div>
                        <div>
                            <h3>Product Name:</h3>
                            <p>{product?.product_name}</p>
                        </div>
                        <div>
                            <h3>Product model:</h3>
                            <p>{product?.product_model}</p>
                        </div>
                        <div>
                            <h3>Manufacturer:</h3>
                            <p>{product?.manufacturer}</p>
                        </div>
                    </div>
                    <div className={classes.delete_button}>
                        <button onClick={deleteHandler}>Delete</button>
                        <button onClick={setDeleteHandler}>Cancel</button>
                    </div>
                </div>
                <div className={classes.delete_background}></div>
            </div>
    )}

                <div className={classes.add_product}>
                <h3>Product <span>Detail</span></h3>
                <form onSubmit={submitUpdateHandler}>
                  <div className={classes.product_detail}>
                    <div>
                      <label htmlFor="product_name">Product ID:</label>
                      <input type="text" name='product_name' defaultValue={product!.id} required ref={productIDRef} disabled/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="product_name">Product Name:</label>
                      <input type="text" name='product_name' defaultValue={product!.product_name} required ref={productNameRef} pattern="^(?!^ +$)([\w -&]+)$"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="product_model">Product Model:</label>
                      <input type="text" name='product_model' defaultValue={product!.product_model} required ref={productModelRef} pattern="^(?!^ +$)([\w -&]+)$"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="manufacturer">Manufacturer:</label>
                      <input type="text" name='manufacturer' defaultValue={product!.manufacturer} required ref={manufacturerRef} pattern="^(?!^ +$)([\w -&]+)$"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="price">Price:</label>
                      <input type="text" name='price' defaultValue={String(product!.price)} required ref={priceRef} pattern="[0-9]*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="stock">Stock:</label>
                      <input type="text" name='stock' defaultValue={product!.stock_on_hand} required ref={stockRef} pattern="[0-9]*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="feature">Feature ID:</label>
                      <input type="text" name='feature' defaultValue={String(product!.feature_id)} required ref={featureRef} disabled/>
                    </div>

                  </div>
                  <h3>Product <span>Feature</span></h3>
                  <div className={classes.product_detail}>
                    <div>
                      <label htmlFor="feature">Feature ID:</label>
                      <input type="text" name='feature' defaultValue={String(feature!.id)} required ref={featureRef} disabled/>
                    </div>
                    <div>
                      <label htmlFor="weight">Weight:</label>
                      <input type="text" name='weight' defaultValue={feature!.weight} required ref={weightRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="dimensions">Dimensions:</label>
                      <input type="text" name='dimensions' defaultValue={feature!.dimensions} required ref={dimensionsRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="os">OS:</label>
                      <input type="text" name='os' defaultValue={feature!.OS} required ref={osRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="screensize">Screen Size:</label>
                      <input type="text" name='screensize' defaultValue={feature!.screensize} required ref={screenSizeRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="resolution">Resolution:</label>
                      <input type="text" name='resolution' defaultValue={feature!.resolution} required ref={resolutionRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="cpu">CPU:</label>
                      <input type="text" name='cpu' defaultValue={feature!.CPU} required ref={cpuRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="ram">RAM:</label>
                      <input type="text" name='ram' defaultValue={feature!.RAM} required ref={ramRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="storage">Storage:</label>
                      <input type="text" name='storage' defaultValue={feature!.storage} required ref={storageRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="battery">Battery:</label>
                      <input type="text" name='battery' defaultValue={feature!.battery} required ref={batteryRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="rear_camera">Rear Camera:</label>
                      <input type="text" name='rear_camera' defaultValue={feature!.rear_camera} required ref={rearCameraRef} pattern="^$|.*\S+.*"/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                    <div>
                      <label htmlFor="front_camera">Front Camera:</label>
                      <input type="text" name='front_camera' defaultValue={feature!.front_camera} required ref={frontCameraRef}/>
                      <span className={classes.input_validation}>Invalid input.</span>
                    </div>
                  </div>
                  <div>
                    <input type="submit" value="Update" className={classes.submit} />
                  </div>
                </form>
                <div className={classes.delete}>
                  <button className={classes.button} onClick={setDeleteHandler}>Delete</button>
                </div>
              </div>
        </>
        )}
    </Fragment>
  )
}

export default UpdateProduct