import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import HomeHeader from "../../components/header/HomeHeader";
import { AppFonts } from "../../styles/AppFonts";
import AppText from "../../components/text/AppText";
import ProductCard from "../../components/cards/ProductCard";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import { products } from "../../data/products";

const HomeScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
      <View style={{ alignItems: "center" }}>
        <FlatList
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              {...item}
              //  price={item.price}
              // title={item.title}
              // imageUrl={item.imageURL}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        />
      </View>
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
