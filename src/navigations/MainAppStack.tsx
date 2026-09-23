import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTab from "./MainAppBottomTab";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import OrderScreen from "../screens/order/OrderScreen";
import { sharedHorizontalPadding } from "../constants/SharedStyles";
const Stack = createStackNavigator();

export default function MainStackScreen() {
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
          headerTitle: "Check-Out",
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
          headerTitle: "Orders",
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
