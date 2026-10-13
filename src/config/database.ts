import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { store } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export const getProductsData = async () => {
    try{
        const data = await getDocs(collection(db,"products"));
        const list = []
        data.forEach((doc)=>{
            list.push(doc.data())
        })
        return list;

    }catch(e){
        console.error("Error fetching products data:", e);
        throw e;
    }
}

export const fetchUserOrders = async (userId) => {







    try{
      
       // const userId =  store.getState().userSlice.userData.uid;
       // const userIdFromFirebase = auth.currentUser?.uid;
        const userOrderRef = collection(doc(db, "users", userId), "orders");
        const querySnapshot = await getDocs(userOrderRef);
        const queryOrderList = querySnapshot.docs.map((doc)=> ({
            id:doc.id,
            ...doc.data()
        }))
         await AsyncStorage.setItem(
      "USER_ORDER",
      JSON.stringify(queryOrderList)
    );

        

        return queryOrderList;   

    }catch(e){
        console.log("error fetching user Orders", e);

    }
}