import { router } from 'expo-router'
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Linking } from "react-native";

export default function Home() {
  const handlePlay = () =>{
    router.push('/pages/menu');
  }

  const handleLinkPress = () => {
    Linking.openURL('https://quizizz.com/?lng=en');
  }
  
  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/d6/70/99/d670990fa86f31233a53a22d7bb2f4bc.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.questionBox} onPress={handleLinkPress}>
            <Text style={styles.questionMark}>❔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
            <Text style={styles.playText}>Play!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.8)" },
  appBar: { backgroundColor: "#6200EA", padding: 15, alignItems: "center" },
  appBarTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  questionBox: { width: 150, height: 150, backgroundColor: "#FFD700", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  questionMark: { fontSize: 80, color: "#fff", fontWeight: "bold" },
  playButton: { backgroundColor: "#FF0000", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 5 },
  playText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#fff" },
  navItem: { alignItems: "center" },
  navIcon: { fontSize: 24 },
  navText: { color: "#6200EA", fontSize: 14, fontWeight: "bold" },
});

