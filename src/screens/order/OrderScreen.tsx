import { StyleSheet, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import OrderCard from "../../components/order/OrderCard";
import { ScrollView } from "react-native-gesture-handler";

const OrderScreen = () => {
  const orders = [
    {
      trackingId: "DE-8029-XPL",
      orderStatus: "delivered",
      address: "24 Crescent Avenue de Parlo",
      orderDate: "Aug. 12, 2026 - 07:05am",
      color: "#DAFFEE",
      color2: "green",
    },
    {
      trackingId: "BC-8829-XPL",
      orderStatus: "failed",
      address: "15 Marina Road, Lagos",
      orderDate: "Sept. 23, 2026 - 10:00am",
      color: "#FEE8E8",
      color2: "red",
    },
    {
      trackingId: "KL-4721-MNP",
      orderStatus: "pending",
      address: "8 Allen Avenue, Ikeja",
      orderDate: "Sept. 23, 2026 - 11:30am",
      color: "#FFFBD1",
      color2: "#706701",
    },
    {
      trackingId: "GH-1938-QRS",
      orderStatus: "delivered",
      address: "42 Admiralty Way, Lekki",
      orderDate: "Sept. 20, 2026 - 02:15pm",
      color: "#DAFFEE",
      color2: "green",
    },
    {
      trackingId: "TX-5820-ABC",
      orderStatus: "pending",
      address: "12 Obafemi Awolowo Way, Ikeja",
      orderDate: "Sept. 21, 2026 - 09:45am",
      color: "#FFFBD1",
      color2: "#706701",
    },
    {
      trackingId: "MN-7392-DEF",
      orderStatus: "failed",
      address: "31 Herbert Macaulay Way, Yaba",
      orderDate: "Sept. 19, 2026 - 04:20pm",
      color: "#FEE8E8",
      color2: "red",
    },
    {
      trackingId: "PL-6401-GHI",
      orderStatus: "delivered",
      address: "7 Ahmadu Bello Way, Victoria Island",
      orderDate: "Sept. 18, 2026 - 01:10pm",
      color: "#DAFFEE",
      color2: "green",
    },
    {
      trackingId: "QR-9217-JKL",
      orderStatus: "pending",
      address: "19 Admiralty Road, Lekki",
      orderDate: "Sept. 17, 2026 - 08:30am",
      color: "#FFFBD1",
      color2: "#706701",
    },
    {
      trackingId: "UV-3584-MNO",
      orderStatus: "delivered",
      address: "5 Isaac John Street, GRA Ikeja",
      orderDate: "Sept. 15, 2026 - 03:45pm",
      color: "#DAFFEE",
      color2: "green",
    },
    {
      trackingId: "WX-8163-PQR",
      orderStatus: "failed",
      address: "28 Lagos Street, Surulere",
      orderDate: "Sept. 14, 2026 - 11:25am",
      color: "#FEE8E8",
      color2: "red",
    },
  ];

  return (
    <AppSaveView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {orders.map((order) => (
            <OrderCard
              key={order.trackingId}
              trackingId={order.trackingId}
              orderStatus={order.orderStatus}
              address={order.address}
              orderDate={order.orderDate}
              color={order.color}
              color2={order.color2}
              onPress={() => {
                console.log("Order pressed:", order.trackingId);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </AppSaveView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sharedHorizontalPadding,
  },
});
