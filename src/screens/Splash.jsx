import { useEffect, useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const size = Dimensions.get("screen");

const Splash = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem("token");

        if (token) {
          navigation.replace("Home");
        }
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, []);

  return (
    <View
      style={{
        width: size.width,
        height: size.height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#53BF9D",
      }}
    >
      <Image source={require("../../assets/logo.png")} />
      <View style={{ marginVertical: 100 }} />
      {loading ? (
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
          Loading...
        </Text>
      ) : (
        <ButtonComponent
          label="Mulai"
          textStyles={{ color: "#fff", fontSize: 18, fontWeight: "500" }}
          styles={{ backgroundColor: "#FFC54D" }}
          onPress={() => navigation.replace("Login")}
        />
      )}
    </View>
  );
};

export default Splash;
