import { useState, useMemo } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Container from "../components/Container";
import TextInputComponent from "../components/TextInputComponent";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../plugins/constants";

const size = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/login`, { email, password });

      await AsyncStorage.setItem("token", response.data?.data?.token ?? "");

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message ?? "");
    } finally {
      setLoading(false);
    }
  };

  const isValidForm = useMemo(() => email && password, [email, password]);

  return (
    <Container
      styles={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#53BF9D",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: size.width,
          paddingHorizontal: 24,
          paddingBottom: 8,
        }}
      >
        <TextComponent color="#fff" fontSize={36} fontWeight={"700"} letterSpacing={-1}>
          Welcome!
        </TextComponent>

        <Image source={require("../../assets/gbk.png")} />
      </View>

      <View
        style={{
          width: size.width,
          height: size.height * 0.6,
          backgroundColor: "#fff",
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          paddingHorizontal: 24,
          paddingTop: size.height * 0.04,
          alignItems: "center",
        }}
      >
        {/* email */}
        <TextInputComponent
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />

        <View style={{ marginVertical: 8 }} />

        {/* password */}
        <TextInputComponent
          placeholder="Password"
          value={password}
          isPassword
          onChange={setPassword}
        />

        <View style={{ marginVertical: 14 }} />

        <ButtonComponent
          label="Masuk"
          isDisable={!isValidForm}
          isLoading={loading}
          styles={{ backgroundColor: "#FFC54D" }}
          textStyles={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
          onPress={handleLogin}
        />

        <View style={{ marginVertical: 8 }} />

        <View style={{ flexDirection: "row" }}>
          <TextComponent fontSize={14}>Belum punya akun?</TextComponent>
          <View style={{ marginHorizontal: 3 }} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
          >
            <TextComponent color="#53BF9D" fontSize={14} fontWeight={"bold"}>
              Daftar
            </TextComponent>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
