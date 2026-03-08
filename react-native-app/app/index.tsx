import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [apiData, setApiData] = useState<any>(null);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!password || !repeatPassword) {
      setPasswordError("Please fill in both password fields");
      valid = false;
    } else if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }

    if (valid) {
      Alert.alert("Success", "Validation passed");
    }
  };

  const fetchGitHubUser = async () => {
    try {
      setLoading(true);
      setApiError("");
      setApiData(null);

      const response = await axios.get("https://api.github.com/users/1");

      setApiData(response.data);
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
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
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}

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
        {!!passwordError && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.apiButton} onPress={fetchGitHubUser}>
          <Text style={styles.apiButtonText}>Fetch GitHub User</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.infoText}>Loading...</Text>}

        {!!apiError && <Text style={styles.errorText}>{apiError}</Text>}

        {apiData && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Login: {apiData.login}</Text>
            <Text style={styles.resultText}>Name: {apiData.name}</Text>
            <Text style={styles.resultText}>URL: {apiData.html_url}</Text>
          </View>
        )}

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

  button: {
    width: "100%",
    height: 58,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1FC7D7",
  },

  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },

  apiButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D7FF9",
  },

  apiButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  errorText: {
    width: "100%",
    color: "red",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 12,
    paddingLeft: 8,
  },

  infoText: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
  },

  resultBox: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 16,
    padding: 14,
  },

  resultText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },

  footerText: {
    marginTop: 20,
    color: "#2AAFC2",
    fontSize: 14,
    fontWeight: "500",
  },
});