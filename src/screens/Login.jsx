import { useState, useMemo } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import Container from "../components/Container";
import TextInputComponent from "../components/TextInputComponent";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import LogoComponent from "../components/LogoComponent";
import { http } from "../../plugins/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const size = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${http}/auth/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.data?.data?.token ?? "");

      navigation.replace("Home");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message ?? error);
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
          paddingBottom: 18,
        }}
      >
        <TextComponent color="#fff" fontSize={36} fontWeight="600">
          Welcome!
        </TextComponent>

        <LogoComponent />
      </View>

      <View
        style={{
          width: size.width,
          height: size.height * 0.6,
          backgroundColor: "#fff",
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          paddingHorizontal: 18,
          paddingTop: size.height * 0.1,
          alignItems: "center",
        }}
      >
        {/* email */}
        <TextInputComponent
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />

        <View style={{ marginVertical: 14 }} />

        {/* password */}
        <TextInputComponent
          placeholder="Password"
          value={password}
          isPassword
          onChange={setPassword}
        />

        <View style={{ marginVertical: 24 }} />

        <ButtonComponent
          label="Masuk"
          isDisable={!isValidForm}
          isLoading={loading}
          styles={{ backgroundColor: "#FFC54D" }}
          textStyles={{ color: "#fff", fontWeight: "500", fontSize: 18 }}
          onPress={handleLogin}
        />

        <View style={{ marginVertical: 10 }} />

        <View style={{ flexDirection: "row" }}>
          <TextComponent fontSize={14}>Belum punya akun?</TextComponent>
          <View style={{ marginHorizontal: 3 }} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
          >
            <TextComponent color="#53BF9D" fontSize={14}>
              Daftar
            </TextComponent>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
