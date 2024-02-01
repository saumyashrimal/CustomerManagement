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
    response = {
        "content": [
            {
                "id": 5,
                "firstName": "Jane",
                "lastName": "Doe",
                "street": "Elvune Street",
                "address": "H no 2",
                "city": "Delhi",
                "state": "Delhi",
                "email": "sam@gmail.com",
                "phone": "12345678"
            },
            {
                "id": 6,
                "firstName": "Jan",
                "lastName": "Doe",
                "street": "Elvune Street",
                "address": "H no 2",
                "city": "Delhi",
                "state": "Delhi",
                "email": "sam@gmail.com",
                "phone": "1278"
            }
        ],
        "pageable": {
            "pageNumber": 1,
            "pageSize": 2,
            "sort": {
                "empty": false,
                "sorted": true,
                "unsorted": false
            },
            "offset": 2,
            "unpaged": false,
            "paged": true
        },
        "last": false,
        "totalPages": 4,
        "totalElements": 7,
        "size": 2,
        "number": 1,
        "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false
        },
        "first": false,
        "numberOfElements": 2,
        "empty": false
    }
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