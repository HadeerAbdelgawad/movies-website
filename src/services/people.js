import { axiosInstance } from "./axiosInstance";

export function getPopularPeople() {
    return axiosInstance.get(`3/person/popular?language=en-US`)
}