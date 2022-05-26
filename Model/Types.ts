export interface Types {
    query: string;
    values: any;
}

//Customer
export interface CustomerType {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postcode: Number;
    state: string;
    password: string;
}

export interface DataType {
    status: string;
    title: string;
    message: string;
}

export interface UpdateCustomerType extends CustomerType {
    newPassword: string;
    currentPassword: string;
}

//Product
export interface Phone {
    id: string;
    product_name: string;
    product_model: string;
    manufacturer: string;
    price: Number;
    stock_on_hand: string;
    feature_id: Number;
}

export interface Phones {
    phones: Phone[]
  }


export interface Feature {
    id: Number;
    weight: string;
    dimensions: string;
    OS: string;
    screensize: string;
    resolution: string;
    CPU: string;
    RAM: string;
    storage: string;
    battery: string;
    rear_camera: string;
    front_camera: string;
}

export interface AdminType {
    id: Number;
    firstname: string;
    lastname: string;
    role: string;
    username: string;
    email: string;
    password: string;
}

export interface UpdateAdminType extends AdminType{
    newPassword: string;
    currentPassword: string;
}

export interface ChangeLogType {
    id: string;
    date_created: string;
    date_last_modified: string;
    user_id: string;
    product_id: string;
    action: string;
}