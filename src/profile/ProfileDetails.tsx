import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "../components/text/AppText";
import { vs } from "react-native-size-matters";
import { s } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileDetails = () => {
  var url =
    "https://images.unsplash.com/photo-1669269628135-21636aefa17d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // this is to get the stored user
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem("USER_DATA");
      if (data != null) {
        const user = data ? JSON.parse(data) : [];
        setData(user);
      } else {
      }
    };

    getData();
  }, []);

  // const { userData } = useSelector((state: RootState) => state.userSlice);
  // const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: s(60),
            height: s(60),
            borderRadius: s(50),
            alignItems: "center",
            justifyContent: "center",
          }}
          resizeMode="cover"
          source={{
            uri: url,
          }}
        />
      </View>
      <AppText variant="bold" style={{ fontSize: s(16), marginTop: s(10) }}>
        Bennet Joyce
      </AppText>
      <AppText style={{ fontSize: s(12) }} variant="medium">
        {data?.email}
      </AppText>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  imageContainer: {},
  container: {
    marginTop: vs(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
