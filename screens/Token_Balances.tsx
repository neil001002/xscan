import React, { useEffect } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const Token_Balances = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [network, setNetwork] = useState("");
  const [assets, setAssets] = useState("");

  const address = `${route.params.data}`;

  const navigation = useNavigation();

  // useEffect(() => {
  //     fetch(`https://stg-api.unmarshal.io/v1/ethereum/address/${route.params.data}/assets?auth_key=VGVtcEtleQ%3D%3D`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //             console.log("Response data", data);

  //         })

  // }, [] );

  const ethereum = async () => {
    try {
      const response = await fetch(
        `https://stg-api.unmarshal.io/v1/ethereum/address/${route.params.data}/assets?auth_key=VGVtcEtleQ%3D%3D`
      );
      const res = await response.json();
      setData(res);
      console.log("response ", res);
    } catch (error) {
      console.log("there was an problem", error);
    } finally {
      setLoading(false);
    }

    setNetwork("Ethereum");
    setAssets("Tokens");
  };

  useEffect(() => {
    ethereum();
  }, []);

  const bsc = async () => {
    try {
      const response = await fetch(
        `https://stg-api.unmarshal.io/v1/bsc/address/${route.params.data}/assets?auth_key=VGVtcEtleQ%3D%3D`
      );
      const res = await response.json();
      setData(res);
      console.log("response ", res);
    } catch (error) {
      console.log("there was an problem", error);
    } finally {
      setLoading(false);
    }

    setNetwork("BSC");
    // setAssets("Tokens");
  };

  const polygon = async () => {
    try {
      const response = await fetch(
        `https://stg-api.unmarshal.io/v1/matic/address/${route.params.data}/assets?auth_key=VGVtcEtleQ%3D%3D`
      );
      const res = await response.json();
      setData(res);
      console.log("response ", res);
    } catch (error) {
      console.log("there was an problem", error);
    } finally {
      setLoading(false);
    }

    setNetwork("Polygon");
    // setAssets("Tokens");
  };

  //   const nfts = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://stg-api.unmarshal.io/v1/bsc/address/${route.params.data}/nft-assets?auth_key=VGVtcEtleQ==`
  //       );
  //       const res = await response.json();
  //       setNftData(res);
  //       console.log("response ", res);
  //     } catch (error) {
  //       console.log("there was an problem", error);
  //     } finally {
  //       setLoading(false);
  //     }

  //     return (
  //       <View style={{ flex: 1 }}>
  //         <Text>All your NFTs</Text>
  //       </View>
  //     );
  //   };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", marginBottom: 10 }}>
        <View style={styles.topButtonContainer}>
          <TouchableOpacity
            onPress={() => ethereum()}
            style={styles.ethTopButton}
          >
            <Text style={styles.buttonText}>Ethereum</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => bsc()} style={styles.ethTopButton}>
            <Text style={styles.buttonText}>BSC</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => polygon()}
            style={styles.ethTopButton}
          >
            <Text style={styles.buttonText}>Polygon</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}
        >
          <Text>Your all</Text>
          <Text style={{ fontWeight: "bold" }}> {assets} </Text>
          <Text>on</Text>
          <Text style={{ fontWeight: "bold" }}> {network} </Text>
          <Text>chain</Text>
        </View>

        {isLoading ? (
          // <ActivityIndicator />
          <Text style={{ textAlign: "center", justifyContent: "center" }}>
            Loading...
          </Text>
        ) : (
          <FlatList
            style={{ borderRadius: 10 }}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.coinContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Image
                      source={{ uri: item.logo_url }}
                      style={{ height: 35, width: 35 }}
                    />
                  </View>

                  <View style={{ marginLeft: 10 }}>
                    <Text>{item.contract_name}</Text>

                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "gray" }}>
                        {item.contract_ticker_symbol}{" "}
                      </Text>
                      <Text style={{ color: "gray" }}>
                        {(item.quote / item.quote_rate).toFixed(4)}{" "}
                      </Text>
                      <Text style={{ color: "gray" }}>${item.quote_rate}</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text>${item.quote.toFixed(4)}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.ethBottomButton}>
          <Text style={styles.buttonText}>Tokens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("NFTs", { add: address })}
          style={styles.ethBottomButton}
        >
          <Text style={styles.buttonText}>NFTs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MainLayout")}>
          <AntDesign name="leftcircle" size={40} color="#28FFBF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Token_Balances;

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    marginTop: 10,
    paddingBottom: 10,
  },

  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 40,
    marginBottom: 10,
  },

  ethTopButton: {
    borderWidth: 2,
    borderColor: "#28FFBF",
    height: 40,
    width: "30%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    left: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
  },

  ethBottomButton: {
    backgroundColor: "#28FFBF",
    height: 40,
    width: "30%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "gray",
    fontWeight: "bold",
  },
});
