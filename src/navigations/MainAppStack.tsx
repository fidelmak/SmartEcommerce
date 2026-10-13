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
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import LoadingComponent from "../components/loading/LoadingComponent";

const Stack = createStackNavigator();

export default function MainStackScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userSlice);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const storedData = await AsyncStorage.getItem("USER_DATA");

        if (storedData) {
          dispatch(setUserData(JSON.parse(storedData)));
        } else {
          dispatch(setUserData(null));
        }
      } catch (error) {
        console.log("Error checking login status:", error);
        dispatch(setUserData(null));
      } finally {
        setIsLoading(false);
      }
    };

    checkUserLogin();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Stack.Navigator
      key={userData ? "authenticated" : "unauthenticated"}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "MainAppBottomTab" : "AuthStack"}
    >
      {!userData ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainAppBottomTab" component={MainAppBottomTab} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
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
        </>
      )}
    </Stack.Navigator>
  );
}
