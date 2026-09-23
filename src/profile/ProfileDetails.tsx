import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppText from "../components/text/AppText";
import { vs } from "react-native-size-matters";
import { s } from "react-native-size-matters";

const ProfileDetails = () => {
  var url =
    "https://images.unsplash.com/photo-1669269628135-21636aefa17d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
        Bennetjoyce@gmail.com
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
