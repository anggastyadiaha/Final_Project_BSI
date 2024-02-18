import { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import Container from "../components/Container";
import OptionComponent from "../components/OptionComponent";
import TextComponent from "../components/TextComponent";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const size = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [result, setResult] = useState("");
  const [playerOption, setPlayerOption] = useState("");
  const [computerOption, setComputerOption] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("");

  const getComputerOption = () => {
    const options = ["stone", "paper", "scissor"];
    const index = Math.floor(Math.random() * 3); // get random number (0, 1, 2)

    setComputerOption(options[index]);
  };

  const handlePlayerOption = (type) => {
    setPlayerOption(type);
    getComputerOption();
  };

  useEffect(() => {
    getResult();
  }, [playerOption, computerOption]);

  useEffect(() => {
    if (playerScore === 3) {
      setStatus("winner");
    }
  }, [playerScore]);

  useEffect(() => {
    if (computerScore === 3) {
      setStatus("loser");
    }
  }, [computerScore]);

  useEffect(() => {
    if (status) {
      setModal(true);
    }
  }, [status]);

  const renderScore = (score) =>
    score <= 9 && score >= 0 ? `0${score}` : `${score}`;

  const getResult = () => {
    if (playerOption && computerOption && playerOption === computerOption) {
      setResult("SERI");
    }

    if (
      (playerOption === "stone" && computerOption === "scissor") ||
      (playerOption === "paper" && computerOption === "stone") ||
      (playerOption === "scissor" && computerOption === "paper")
    ) {
      setPlayerScore((prev) => prev + 1);
      setResult("MENANG");
    }

    if (
      (playerOption === "stone" && computerOption === "paper") ||
      (playerOption === "paper" && computerOption === "scissor") ||
      (playerOption === "scissor" && computerOption === "stone")
    ) {
      setComputerScore((prev) => prev + 1);
      setResult("KALAH");
    }
  };

  const handlePlayAgain = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setStatus("");
    setResult("");
    setModal(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      navigation.replace("Login");
    } catch (_) {
      // error
    }
  };

  return (
    <>
      {/* modal */}
      {modal && (
        <View
          style={{
            width: size.width,
            height: size.height,
            position: "absolute",
            backgroundColor: "rgba(255,255,255, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {status === "winner" && (
              <>
                <TextComponent color="#53BF9D" fontWeight="600" fontSize={48}>
                  Kamu Menang!
                </TextComponent>
                <TextComponent fontSize={64}>🎉🎉🎉</TextComponent>
              </>
            )}

            {status === "loser" && (
              <>
                <TextComponent color="#53BF9D" fontWeight="600" fontSize={48}>
                  Yah, kalah...
                </TextComponent>
                <TextComponent fontSize={64}>😢😢😢</TextComponent>
              </>
            )}

            <View style={{ marginVertical: 18 }} />

            <ButtonComponent
              styles={{ backgroundColor: "#FFC54D" }}
              textStyles={{ color: "#fff", fontSize: 18, fontWeight: "500" }}
              label="Main Lagi"
              onPress={handlePlayAgain}
            />
            <View style={{ marginVertical: 5 }} />
            <ButtonComponent
              styles={{ backgroundColor: "#FFC54D" }}
              textStyles={{ color: "#fff", fontSize: 18, fontWeight: "500" }}
              label="Keluar"
              onPress={handleLogout}
            />
          </View>
        </View>
      )}

      <Container
        styles={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* computer section */}
        <View
          style={{
            backgroundColor: "#FFC54D",
            flex: 1,
            width: size.width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OptionComponent type={computerOption} />

          <View style={{ marginTop: 36 }}>
            <TextComponent fontSize={48} color="#fff" fontWeight="600">
              {renderScore(computerScore)}
            </TextComponent>
          </View>
        </View>

        {/* player section */}
        <View
          style={{
            backgroundColor: "#53BF9D",
            flex: 1,
            width: size.width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginBottom: 36 }}>
            <TextComponent fontSize={48} color="#fff" fontWeight="600">
              {renderScore(playerScore)}
            </TextComponent>
          </View>
          <View style={{ flexDirection: "row" }}>
            <OptionComponent
              type="stone"
              onPress={() => {
                handlePlayerOption("stone");
              }}
            />
            <OptionComponent
              type="paper"
              onPress={() => {
                handlePlayerOption("paper");
              }}
            />
            <OptionComponent
              type="scissor"
              onPress={() => {
                handlePlayerOption("scissor");
              }}
            />
          </View>
        </View>

        {/* result section */}
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
          }}
        >
          <View
            style={{
              width: size.width * 0.4,
              height: 70,
              marginHorizontal: 10,
              backgroundColor: "#fff",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: "500" }}>{result}</Text>
          </View>
        </View>
      </Container>
    </>
  );
};

export default Home;
