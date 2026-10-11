import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTab from "./MainAppBottomTab";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import OrderScreen from "../screens/order/OrderScreen";
import { sharedHorizontalPadding } from "../constants/SharedStyles";
import { useTranslation } from "react-i18next";
const Stack = createStackNavigator();

export default function MainStackScreen() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTab" component={MainAppBottomTab} />
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
