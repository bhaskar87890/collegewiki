import { create } from "zustand";
import axios from "axios";
import { verifyEmail } from "./backend/auth.controller.js";

const API_URL = "http://localhost:5000/api/auth";
export const  useAuthstore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup:async(email,password,name) =>{
        set({isLoading:true,error:null});
        try {
         const response = await axios.post(`${API_URL}/signup`,{email,password,name});
         set.user({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading:false});
            throw error;
            
        }
    },

    verifyEmail: async(code) => {
        set({ isLoading:true ,error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false});
            return response.data;
        } catch (error) {
           set({error:response.error.data.message||"Error verifying email",isLoading:false});
           throw error;
            
        }
    },

}));