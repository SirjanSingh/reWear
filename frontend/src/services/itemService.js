import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const itemService = {
    // Get all items with optional filters
    getItems: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`${API_URL}/items${queryParams ? `?${queryParams}` : ''}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },

    // Get a single item by ID
    getItemById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/items/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching item:', error);
            throw error;
        }
    },

    // Create a new item
    createItem: async (itemData) => {
        try {
            const response = await axios.post(`${API_URL}/items`, itemData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    },

    // Update an item
    updateItem: async (id, itemData) => {
        try {
            const response = await axios.put(`${API_URL}/items/${id}`, itemData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },

    // Delete an item
    deleteItem: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/items/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }
}; 