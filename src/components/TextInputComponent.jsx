import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const size = Dimensions.get("window");

const TextInputComponent = ({ value, onChange, isPassword, placeholder }) => {
  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  const handleInput = (newValue) => {
    onChange(newValue ?? "");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        width: size.width - 42,
        padding: 14,
        borderRadius: 12,
      }}
    >
      <TextInput
        value={value}
        onChangeText={handleInput}
        secureTextEntry={isPassword && !show}
        placeholder={placeholder}
        style={styles.textInput}
      />
      {isPassword && (
        <TouchableOpacity onPress={handleShowPassword}>
          <Feather name={show ? "eye-off" : "eye"} size={16} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    flex: 1,
  },
});
