import { useMemo, useState } from "react";
import { View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Container from "../components/Container";
import TextInputComponent from "../components/TextInputComponent";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import LogoComponent from "../components/LogoComponent";
import { http } from "../../plugins/axios";
import axios from "axios";

const size = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPassword = useMemo(
    () => password && passwordConfirmation && password === passwordConfirmation,
    [password, passwordConfirmation]
  );

  const isValidForm = useMemo(
    () => name && email && isValidPassword,
    [name, email, isValidPassword]
  );

  const handleRegister = async () => {
    try {
      setLoading(true);

      await axios.post(`${http}/auth/register`, {
        name,
        email,
        password,
      });
      alert("create new user is successfully");

      navigation.replace("Login");
    } catch (error) {
      alert(error?.response?.data?.message ?? error);
    } finally {
      setLoading(true);
    }
  };

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
          Buat Akun
        </TextComponent>

        <LogoComponent />
      </View>

      <View
        style={{
          width: size.width,
          height: size.height * 0.6,
          backgroundColor: "#fff",
          borderTopLeftRadius: 36,
          justifyContent: "center",
          borderTopRightRadius: 36,
          paddingTop: size.height * 0.1,
          alignItems: "center",
        }}
      >
        <ScrollView
          style={{
            paddingHorizontal: 10,
            paddingBottom: 48,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            {/* name */}
            <TextInputComponent
              placeholder="Nama"
              value={name}
              onChange={setName}
            />

            <View style={{ marginVertical: 14 }} />

            {/* email */}
            <TextInputComponent
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <View style={{ marginVertical: 14 }} />

            {/* password */}
            <TextInputComponent
              isPassword
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />

            <View style={{ marginVertical: 14 }} />

            {/* password confirmation */}
            <TextInputComponent
              isPassword
              placeholder="Konfirmasi Password"
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
            />

            <View style={{ marginVertical: 24 }} />

            <ButtonComponent
              label="Daftar"
              isLoading={loading}
              isDisable={!isValidForm}
              styles={{ backgroundColor: "#FFC54D" }}
              textStyles={{ color: "#fff", fontWeight: "500", fontSize: 18 }}
              onPress={handleRegister}
            />

            <View style={{ marginVertical: 10 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 18,
              }}
            >
              <TextComponent fontSize={14}>Sudah punya akun?</TextComponent>
              <View style={{ marginHorizontal: 3 }} />

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate("Login")}
              >
                <TextComponent color="#53BF9D" fontSize={14}>
                  Masuk
                </TextComponent>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Register;
