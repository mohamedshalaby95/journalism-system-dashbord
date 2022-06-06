import axios from 'axios'
console.log(process.env);

export default axios.create({
    baseURL:`${process.env.REACT_APP_BACKEND}/admin`
}

)