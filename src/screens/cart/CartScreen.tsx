import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import HomeHeader from "../../components/header/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItems from "../../components/carts/CartItems";
import TotalViews from "../../components/carts/TotalViews";
import { products } from "../../data/products";

const CartScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartItems {...item} qty={1} />}
      />

      <TotalViews
        itemPrice={""}
        shippingFee={""}
        tax={""}
        orderTotal={""}
        onCheckoutPress={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
