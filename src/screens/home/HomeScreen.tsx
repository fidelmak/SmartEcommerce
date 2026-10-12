import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AppSaveView from "../../components/saveView/AppSaveView";
import HomeHeader from "../../components/header/HomeHeader";
import AppText from "../../components/text/AppText";
import ProductCard from "../../components/cards/ProductCard";
import { sharedHorizontalPadding } from "../../constants/SharedStyles";
import AppTextInput from "../../components/inputs/AppTextInput";
import { s, vs } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducer/cartSlice";
import { getProductsData } from "../../config/database";
import showMess from "../../components/notification/ShowMessage";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getProductsData();

      setProducts(data ?? []);
    } catch (err) {
      console.log("Error fetching products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppSaveView>
      <HomeHeader />

      <View style={styles.searchContainer}>
        <AppTextInput
          values={search}
          onChangeText={setSearch}
          placeholder={t("searchPlaceholder")}
          secureTextEntry={false}
          keyboardType="default"
          style={{}}
        />
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <AppText>Loading products...</AppText>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <AppText>Unable to load products.</AppText>
          </View>
        ) : (
          <FlatList
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={products.filter((item) =>
              item.title?.toLowerCase().includes(search.toLowerCase()),
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                {...item}
                onPress={() =>
                  navigation.navigate("ProductDetailsScreen", {
                    product: item,
                  })
                }
                onAddToCart={() => {
                  showMess(t("addedToCart", { title: item.title }), "green");
                  dispatch(addItemToCart(item));
                }}
              />
            )}
            ListEmptyComponent={
              <View style={styles.center}>
                <AppText>No products found.</AppText>
              </View>
            }
          />
        )}
      </View>
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: sharedHorizontalPadding,
    marginBottom: s(12),
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
  },
  listContent: {
    gap: 10,
    paddingBottom: vs(120),
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
