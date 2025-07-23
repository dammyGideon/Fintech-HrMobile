import axios from "axios";

export const getCustomerById = async (customerId, token)=>{
   try{
        const response = await axios.get(`https://backend.jompstart.com/get-customer?customerId=${customerId}`, {
            headers: {
                Authorization:`Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return response.data.data;
   }catch(error){
        console.log("Error Fetching Customers", error?.response?.data || error.message)
        throw error
   }
}