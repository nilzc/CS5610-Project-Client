import {CLOUD_NAME} from "./utils";
import axios from "axios";

const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

export const uploadImage = (image) => {
    return axios.post(BASE_URL, image)
        .then(response => response.data);
}