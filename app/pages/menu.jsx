import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

export default function Menu() {
  const goHistory = () => {
    router.push('/games/history');
  };
  const goScience = () => {
    router.push('/games/science');
  };
  const goMath = () => {
    router.push('/games/math');
  };
  const goHealth = () => {
    router.push('/games/health');
  };
  const goTechnology = () => {
    router.push('/games/technology');
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/d6/70/99/d670990fa86f31233a53a22d7bb2f4bc.jpg' }} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Main Content */}
          <View style={styles.content}>
            <TouchableOpacity style={styles.questionBox}>
              <Text style={styles.questionMark}>❔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, styles.historyButton]} onPress={goHistory}>
              <Text style={styles.playText}>WORLD HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, styles.scienceButton]} onPress={goScience}>
              <Text style={styles.playText}>SCIENCE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, styles.mathButton]} onPress={goMath}>
              <Text style={styles.playText}>MATHEMATICS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, styles.healthButton]} onPress={goHealth}>
              <Text style={styles.playText}>HEALTH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.playButton, styles.technologyButton]} onPress={goTechnology}>
              <Text style={styles.playText}>TECHNOLOGY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  questionBox: { width: 150, height: 150, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 20, borderRadius: 10 },
  questionMark: { fontSize: 80, color: '#fff', fontWeight: 'bold' },
  playButton: { paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, marginVertical: 10, width: '80%', alignItems: 'center' },
  playText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  historyButton: { backgroundColor: '#cd402a' },
  scienceButton: { backgroundColor: '#FF6347' },
  mathButton: { backgroundColor: '#4682B4' },
  healthButton: { backgroundColor: '#4BDEDB' },
  technologyButton: { backgroundColor: '#151B54' },
});