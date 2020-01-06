import axios from 'axios'
export class Api {
    constructor(name, data = "") {
        this.relativePath = "/api/h5";
        this.name = name;
        this.data = data;
    }
    ApiPost() {
        return axios.post(this.relativePath + this.name, this.data).then((res) => {
            return res;
        }) 
    }
    ApiGet() {
        return axios.get(this.relativePath + this.name, this.data).then((res) => {
            return res;
        })
    }
    ApiPut() {
        return axios.put(this.relativePath + this.name, this.data).then((res) => {
            return res;
        })
    }
}