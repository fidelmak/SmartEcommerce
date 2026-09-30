import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import HomeHeader from "../../components/header/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItems from "../../components/carts/CartItems";
import TotalViews from "../../components/carts/TotalViews";
import { products } from "../../data/products";
import { useNavigation } from "@react-navigation/native";
import CheckoutScreen from "./CheckoutScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  increaseItem,
  removeFromCart,
  removeTotalItem,
} from "../../store/reducer/cartSlice";
import { SHIPPING_FEE, TAX } from "../../constants/constant";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";

const CartScreen = () => {
  const navigation = useNavigation();

  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const totalProductItemSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductItemSum + SHIPPING_FEE + TAX;

  return (
    <AppSaveView>
      <HomeHeader />

      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedHorizontalPadding, flex: 1 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={items}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CartItems
                {...item}
                price={item.sum}
                onIncreasePress={() => dispatch(increaseItem(item))}
                onDecreasePress={() => dispatch(removeFromCart(item))}
                onDeletePress={() => dispatch(removeTotalItem(item))}
              />
            )}
          />
          <TotalViews
            itemPrice={totalProductItemSum}
            shippingFee={SHIPPING_FEE}
            tax={TAX}
            orderTotal={orderTotal}
            onCheckoutPress={() => navigation.navigate("CheckoutScreen")}
          />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
