import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../profile/ProfileScreen";
import { AppColors } from "../styles/AppColors";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function MainAppBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarLabelStyle: {
          marginTop: vs(4),
          fontSize: s(12),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="home" color={color} size={size} title="Home" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="cart" color={color} size={size} title="Cart" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="person"
                color={color}
                size={size}
                title="Profile"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
