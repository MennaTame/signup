import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignUp = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }

    if (!password || !repeatPassword) {
      setPasswordError("Please enter both password fields");
      valid = false;
    }

    if (valid) {
      Alert.alert("Success", "Sign up completed successfully");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="email"
          placeholderTextColor="#8D95A6"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          placeholder="password"
          placeholderTextColor="#8D95A6"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TextInput
          placeholder="repeat password"
          placeholderTextColor="#8D95A6"
          secureTextEntry
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          style={styles.input}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Read User License Agreement</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#16B9D8",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  card: {
    width: "92%",
    minHeight: "95%",
    backgroundColor: "#F7F8FC",
    borderRadius: 35,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1FC7D7",
    marginBottom: 45,
  },

  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 22,
    fontSize: 18,
    color: "#444",
    marginBottom: 18,
    shadowColor: "#9FE8F1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  errorText: {
    width: "100%",
    color: "red",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 12,
    paddingLeft: 8,
  },

  button: {
    width: "100%",
    height: 58,
    borderRadius: 30,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1FC7D7",
  },

  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "500",
  },

  footerText: {
    marginTop: 20,
    color: "#2AAFC2",
    fontSize: 14,
    fontWeight: "500",
  },
});