import { ENV } from "./env";

const ENDPOINT_URL = ENV.END_POINT
const API = '/api'
const BASE_URL = `${ENDPOINT_URL + API}`

export const ApiRouters = {
    EXAMPLE: {
        LIST: BASE_URL + '/product'
    }
}