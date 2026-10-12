import { StyleSheet, FlatList, ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppSaveView from "../../components/saveView/AppSaveView";
import AppText from "../../components/text/AppText";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import OrderCard from "../../components/order/OrderCard";
import { fetchUserOrders } from "../../config/database";
import { getFirebaseDateStamp } from "../../helpers/DateTimeHelper";

const OrderScreen = () => {
  const [orderList, setOrder] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        // 1. Get the logged-in user
        const storedUser = await AsyncStorage.getItem("USER_DATA");

        if (!storedUser) {
          if (isMounted) {
            setOrder([]);
            setLoading(false);
          }
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user?.uid;

        if (!userId) {
          throw new Error("User ID not found");
        }

        // Use a separate cache for each user
        const cacheKey = `USER_ORDER_${userId}`;

        // 2. Load cached orders immediately
        const cachedOrders = await AsyncStorage.getItem(cacheKey);

        if (cachedOrders && isMounted) {
          setOrder(JSON.parse(cachedOrders));
          setLoading(false);
        }

        // 3. Fetch the latest orders from Firebase
        const freshOrders = await fetchUserOrders(userId);

        if (isMounted) {
          setOrder(freshOrders ?? []);
          setLoading(false);
        }

        // 4. Save the latest orders locally
        await AsyncStorage.setItem(cacheKey, JSON.stringify(freshOrders ?? []));
      } catch (err) {
        console.log("Error loading orders:", err);

        if (isMounted) {
          setError("Unable to refresh orders.");
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <OrderCard
      trackingId={item.id}
      orderPrice={Number(item.totalProductItemSum ?? 0).toFixed(2)}
      address={item.address}
      orderDate={item.createdAt ? getFirebaseDateStamp(item.createdAt) : ""}
      color={item.color}
      color2={item.color2}
      onPress={() => {
        console.log("Order pressed:", item.id);
      }}
      orderStatus={item.orderStatus ?? ""}
    />
  );

  return (
    <AppSaveView>
      {loading && orderList.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <AppText>Loading orders...</AppText>
        </View>
      ) : error && orderList.length === 0 ? (
        <View style={styles.center}>
          <AppText>{error}</AppText>
        </View>
      ) : (
        <FlatList
          data={orderList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          ListEmptyComponent={
            <View style={styles.center}>
              <AppText>No orders found.</AppText>
            </View>
          }
        />
      )}
    </AppSaveView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sharedHorizontalPadding,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
});
