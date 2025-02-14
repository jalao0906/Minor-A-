import { router } from 'expo-router';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';

export default function About() {
  const goHome = () => {
    router.push('../(tabs)/');
  };

  const openDeveloperLink = () => {
    Linking.openURL('https://github.com/jalao0906');
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/d6/70/99/d670990fa86f31233a53a22d7bb2f4bc.jpg' }} style={styles.backgroundImage}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.paragraph}>
                Welcome to our Quiz Game! Our mission is to provide a fun and engaging way for people to test their knowledge on various topics. Whether you're a history buff, a science enthusiast, or just looking for a fun way to pass the time, our quiz game has something for everyone.
                </Text>
                <Text style={styles.paragraph}>
                Our team is dedicated to creating high-quality content that is both educational and entertaining. We believe that learning should be fun, and our quiz game is designed to make learning enjoyable for people of all ages.
                </Text>
                <Text style={styles.paragraph}>
                We are constantly updating our quiz game with new questions and topics, so there's always something new to learn. We also value feedback from our users, so if you have any suggestions or comments, please feel free to reach out to us.
                </Text>
                <Text style={styles.paragraph}>
                Thank you for choosing our Quiz Game. We hope you enjoy playing and learning with us!
                </Text>
                <Text style={styles.toDeveloper} onPress={openDeveloperLink}>
                🧑‍💻Find out about the Developer
                </Text>
                <TouchableOpacity 
                onPress={goHome} 
                style={styles.homeButton}>
                <Text style={styles.homeButtonText}>Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  scrollContent: { padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  paragraph: { fontSize: 18, color: 'white', marginBottom: 15, textAlign: 'center' },
  homeButton: { backgroundColor: '#1E90FF', padding: 15, borderRadius: 10, marginVertical: 20, width: '80%', alignItems: 'center' },
  toDeveloper: { color: 'blue', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' },
  homeButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});