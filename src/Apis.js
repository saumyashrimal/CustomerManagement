import axiosInstance from "./Helper/AxiosHelper";

const token = sessionStorage.getItem('token');

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const loginApi = async (email, pwd) => {
    let response = axiosInstance.post('/auth/login', 
    {
        "email":email,
        "password":pwd
    }
    );
    sessionStorage.setItem('token', response.jwtToken);
}


const getCustomerDetails = async (page,size,searchType,searchVal) => {
    let response = axiosInstance.get(`http://localhost:8080/customer/getAllCustomers?searchtype=${searchType}&searchval=${searchVal}&page=${page}&size=${size}&sortBy`,config);
    return response.content;
}

const updateCustomer = async (reqObj) => {
    let response = await axiosInstance.put(`/customer/updateCustomer`,reqObj,config);
    return response === 'Success!';
}

const deleteCustomer = async (id) => {
    let response = await axiosInstance.delete(`/customer/deleteCustomer?id=${id}`,config);
    return response === 'Success!';
}

const createCustomer = async (reqObj) => {
    let response = await axiosInstance.post('/customer/createCustomer', 
        reqObj,
        config
    );
    return response === 'Success!';
}

export {loginApi, getCustomerDetails, createCustomer, updateCustomer, deleteCustomer};