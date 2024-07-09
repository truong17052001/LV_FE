// src/services/apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/client";

//DetailTour
export const getTourDetails = (id) => {
  return axios.get(`${API_BASE_URL}/tour/${id}`);
};
//Hotel
export const getHotels = () => {
  return axios.get(`${API_BASE_URL}/hotel`);
};
export const getHotel = (id) => {
  return axios.get(`${API_BASE_URL}/hotel/${id}`);
};
export const addHotel = (hotelData) => {
  return axios.post(`${API_BASE_URL}/hotel/add`, hotelData);
};
export const updateHotel = (id, hotelData) => {
  return axios.put(`${API_BASE_URL}/hotel/edit/${id}`, hotelData);
};
export const deleteHotel = (id) => {
  return axios.delete(`${API_BASE_URL}/hotel/delete/${id}`);
};
//Place
export const getPlaces = () => {
  return axios.get(`${API_BASE_URL}/place`);
};
export const getPlace = (id) => {
  return axios.get(`${API_BASE_URL}/place/${id}`);
};
export const addPlace = (PlaceData) => {
  return axios.post(`${API_BASE_URL}/Place/add`, PlaceData);
};
export const updatePlace = (id, PlaceData) => {
  return axios.put(`${API_BASE_URL}/Place/edit/${id}`, PlaceData);
};
export const deletePlace = (id) => {
  return axios.delete(`${API_BASE_URL}/Place/delete/${id}`);
};
//Vehicle
export const getVehicles = () => {
  return axios.get(`${API_BASE_URL}/vehicle`);
};
export const getVehicle = (id) => {
  return axios.get(`${API_BASE_URL}/vehicle/${id}`);
};
export const addVehicle = (vehicleData) => {
  return axios.post(`${API_BASE_URL}/vehicle/add`, vehicleData);
};
export const updateVehicle = (id, vehicleData) => {
  return axios.put(`${API_BASE_URL}/vehicle/edit/${id}`, vehicleData);
};
export const deleteVehicle = (id) => {
  return axios.delete(`${API_BASE_URL}/vehicle/delete/${id}`);
};
//Tour
export const getTours = () => {
  return axios.get(`${API_BASE_URL}/tour`);
};
export const addTour = (tourData) => {
  return axios.post(`${API_BASE_URL}/tour/add`, tourData);
};
export const updateTour = (id, tourData) => {
  return axios.put(`${API_BASE_URL}/tour/edit/${id}`, tourData);
};
export const deleteTour = (id) => {
  return axios.delete(`${API_BASE_URL}/tour/delete/${id}`);
};
//Date
export const getDates = () => {
  return axios.get(`${API_BASE_URL}/date`);
};
export const getDetailDate = (id) => {
  return axios.get(`${API_BASE_URL}/date/${id}`);
};
export const addDate = (dateData) => {
  return axios.post(`${API_BASE_URL}/date/add`, dateData);
};
export const updateDate = (id, dateData) => {
  return axios.put(`${API_BASE_URL}/date/edit/${id}`, dateData);
};
export const deleteDate = (id) => {
  return axios.delete(`${API_BASE_URL}/date/delete/${id}`);
};
//Guider
export const getGuiders = () => {
  return axios.get(`${API_BASE_URL}/guider`);
};
export const getGuider = (id) => {
  return axios.get(`${API_BASE_URL}/guider/${id}`);
};
export const addGuider = (guiderData) => {
  return axios.post(`${API_BASE_URL}/guider/add`, guiderData);
};
export const updateGuider = (id, guiderData) => {
  return axios.put(`${API_BASE_URL}/guider/edit/${id}`, guiderData);
};
export const deleteGuider = (id) => {
  return axios.delete(`${API_BASE_URL}/guider/delete/${id}`);
};
//user
export const getBookings = () => {
  return axios.get(`${API_BASE_URL}/booking`);
};
export const getBooking = (id) => {
  return axios.get(`${API_BASE_URL}/booking/${id}`);
};
export const addBooking = (bookingData) => {
  return axios.post(`${API_BASE_URL}/booking/add`, bookingData);
};
export const updateBooking = (id, bookingData) => {
  return axios.put(`${API_BASE_URL}/booking/edit/${id}`, bookingData);
};
export const deleteBooking = (id) => {
  return axios.delete(`${API_BASE_URL}/booking/delete/${id}`);
};
//Customer
export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/user/`);
};
export const getUser = (id) => {
  return axios.get(`${API_BASE_URL}/user/${id}`);
};
export const addUser = (userData) => {
  return axios.post(`${API_BASE_URL}/user/register`, userData);
};
export const updateUser = (id, userData) => {
  return axios.put(`${API_BASE_URL}/user/edit/${id}`, userData);
};
export const deleteUser = (id) => {
  return axios.delete(`${API_BASE_URL}/user/delete/${id}`);
};