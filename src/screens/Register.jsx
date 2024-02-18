import { useMemo, useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Container from "../components/Container";
import TextInputComponent from "../components/TextInputComponent";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";
import { API_URL } from "../../plugins/constants";

const size = Dimensions.get("window");

const Register = ({ navigation }) => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPassword = useMemo(
    () => password && confirmPassword && password === confirmPassword,
    [password, confirmPassword]
  );

  const isValidForm = useMemo(
    () => fullName && email && isValidPassword,
    [fullName, email, isValidPassword]
  );

  const handleRegister = async () => {
    try {
      setLoading(true);
      console.log({ fullName, email, password, confirmPassword });
      await axios.post(`${API_URL}/register`, { fullName, email, password, confirmPassword });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("create new user is successful!");
      navigation.replace("Login");
    } catch (error) {
      alert(error?.response?.data?.message ?? "");
      setLoading(false)
    } finally {
      setLoading(false);
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
          paddingBottom: 8,
        }}
      >
        <TextComponent color="#fff" fontSize={36} fontWeight={"700"} letterSpacing={-1}>
          Buat Akun
        </TextComponent>

        <Image source={require("../../assets/gbk.png")} />
      </View>

      <View
        style={{
          width: size.width,
          height: size.height * 0.6,
          backgroundColor: "#fff",
          borderTopLeftRadius: 36,
          justifyContent: "center",
          borderTopRightRadius: 36,
          paddingTop: size.height * 0.04,
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
              value={fullName}
              onChange={setName}
            />

            <View style={{ marginVertical: 8 }} />

            {/* email */}
            <TextInputComponent
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <View style={{ marginVertical: 8 }} />

            {/* password */}
            <TextInputComponent
              isPassword
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />

            <View style={{ marginVertical: 8 }} />

            {/* password confirmation */}
            <TextInputComponent
              isPassword
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={setPasswordConfirmation}
            />

            <View style={{ marginVertical: 14 }} />

            <ButtonComponent
              label="Daftar"
              isLoading={loading}
              isDisable={!isValidForm}
              styles={{ backgroundColor: "#FFC54D" }}
              textStyles={{ color: "#fff", fontWeight: "600", fontSize: 18 }}
              onPress={handleRegister}
            />

            <View style={{ marginVertical: 8 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 14,
              }}
            >
              <TextComponent fontSize={14}>Sudah punya akun?</TextComponent>
              <View style={{ marginHorizontal: 3 }} />

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate("Login")}
              >
                <TextComponent color="#53BF9D" fontSize={14} fontWeight={"bold"}>
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
