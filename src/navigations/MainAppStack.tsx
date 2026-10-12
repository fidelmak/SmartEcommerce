import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTab from "./MainAppBottomTab";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import OrderScreen from "../screens/order/OrderScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailsScreen";
import { sharedHorizontalPadding } from "../constants/SharedStyles";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/reducer/userReducer";
import { useEffect } from "react";
import { RootState } from "../store/store";
const Stack = createStackNavigator();

export default function MainStackScreen() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.userSlice);

  const isUserLogin = async () => {
    try {
      const storedData = await AsyncStorage.getItem("USER_DATA");

      if (storedData) {
        dispatch(setUserData(JSON.parse(storedData)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isUserLogin();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "MainAppBottomTab" : "AuthStack"}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTab" component={MainAppBottomTab} />
      <Stack.Screen
        name="ProductDetailsScreen"
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTitle: t("productDetails"),
          headerTintColor: "#000",
          headerLeftContainerStyle: {
            paddingLeft: sharedHorizontalPadding,
          },
        }}
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CheckoutScreen"
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTitle: t("checkoutHeaderTitle"),
          headerTintColor: "#000",
          headerLeftContainerStyle: {
            paddingLeft: sharedHorizontalPadding,
          },
        }}
        component={CheckoutScreen}
      />
      <Stack.Screen
        name="OrderScreen"
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTitle: t("ordersHeaderTitle"),
          headerTintColor: "#000",
          headerLeftContainerStyle: {
            paddingLeft: sharedHorizontalPadding,
          },
        }}
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
}
