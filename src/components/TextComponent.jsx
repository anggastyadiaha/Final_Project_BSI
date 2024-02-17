import { Text } from "react-native";

const TextComponent = ({ children, fontSize, color, fontWeight, styles, letterSpacing }) => {
  return (
    <Text style={{ ...styles, fontSize, color, fontWeight, letterSpacing }}>{children}</Text>
  );
};

export default TextComponent;