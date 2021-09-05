import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

const NFTs = ({ route }) => {
  const [isLoading, setLoading] = useState(true);
  const [nftData, setNftData] = useState([]);
  const [network, setNetwork] = useState("");

  const navigation = useNavigation();

  const ethereum = async () => {
    try {
      const response = await fetch(
        `https://stg-api.unmarshal.io/v1/ethereum/address/${route.params.add}/nft-assets?auth_key=VGVtcEtleQ==`
      );
      const res = await response.json();
      setNftData(res);
      console.log("response ", res);
    } catch (error) {
      console.log("there was an problem", error);
    } finally {
      setLoading(false);
    }
    setNetwork("Ethereum");
  };

  useEffect(() => {
    ethereum();
  }, []);

  const bsc = async () => {
    try {
      const response = await fetch(
        `https://stg-api.unmarshal.io/v1/bsc/address/${route.params.add}/nft-assets?auth_key=VGVtcEtleQ==`
      );
      const res = await response.json();
      setNftData(res);
      console.log("response ", res);
    } catch (error) {
      console.log("there was an problem", error);
    } finally {
      setLoading(false);
    }
    setNetwork("BSC");
  };

  return (
    <View style={{ flex: 1 }}>
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
      </View>

      <View style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>
        <Text>Your all</Text>
        <Text style={{ fontWeight: "bold" }}> NFTs </Text>
        <Text>on</Text>
        <Text style={{ fontWeight: "bold" }}> {network} </Text>
        <Text>chain</Text>
      </View>

      {isLoading ? (
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          Loading...
        </Text>
      ) : (
        <FlatList
          data={nftData}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                margin: 5,
                shadowColor: "black",
              }}
            >
              <Image
                source={{ uri: item.issuer_specific_data.image_url }}
                style={{
                  height: 350,
                  width: "100%",
                  resizeMode: "cover",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              >
                <View>
                  <Text>Id: #{item.token_id}</Text>
                  <Text>Name: {item.issuer_specific_data.name}</Text>
                </View>
                <View>
                  <Text>Items: {item.balance}</Text>
                  <Text>Type: {item.type}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="leftcircle" size={40} color="#28FFBF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NFTs;

const styles = StyleSheet.create({
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
    // backgroundColor: "#28FFBF",
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

  backButton: {
    marginLeft: "85%",
  },

  buttonText: {
    color: "gray",
    fontWeight: "bold",
  },
});
