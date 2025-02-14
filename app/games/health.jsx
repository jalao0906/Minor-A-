import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

const allQuestions = [
    { 
        question: "Which vitamin is essential for strong bones and is primarily obtained from sunlight?", 
        options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
        answer: "Vitamin D",
        image: require('../../assets/health/question1.jpeg') 
    },
    { 
      question: "Which organ is responsible for filtering toxins from the blood?", 
      options: ["Heart", "Liver", "Lungs", "Stomach"],
      answer: "Liver",
      image: require('../../assets/health/question2.jpg') 
    },
    { 
      question: "Which of the following activities is best for improving cardiovascular health?", 
      options: ["Weightlifting", "Yoga", "Stretching", "Running"],
      answer: "Running",
      image: require('../../assets/health/question3.jpg') 
    },
    { 
      question: "Which of the following is considered a macronutrient?", 
      options: ["Vitamins", "Carbohydrates", "Minerals", "Antioxidants"],
      answer: "Carbohydrates",
      image: require('../../assets/health/question4.jpg') 
    },
    { 
      question: "Which mineral is important for maintaining strong teeth and preventing cavities?", 
      options: ["Iron", "Potassium", "Zinc", "Fluoride"],
      answer: "Fluoride",
      image: require('../../assets/health/question5.jpg') 
    },
    { 
      question: "What sleep disorder can be worsened by excessive caffeine intake?", 
      options: ["Insomnia", "Sleep apnea", "Narcolepsy", "Night terrors"],
      answer: "Insomnia",
      image: require('../../assets/health/question6.jpeg') 
    },
    { 
      question: "Which of the following is a communicable disease?", 
      options: ["Diabetes", "Asthma", "Cancer", "Tuberculosis"],
      answer: "Tuberculosis",
      image: require('../../assets/health/question7.jpg') 
    },
    { 
      question: "Which macronutrient is essential for muscle building and repair?", 
      options: ["Protein", "Carbohydrates", "Fats", "Fiber"],
      answer: "Protein",
      image: require('../../assets/health/question8.png') 
    },
    { 
      question: "What is the most common symptom of dehydration?", 
      options: ["Fever", "Headache", "Dizziness", "Blurred vision"],
      answer: "Headache",
      image: require('../../assets/health/question9.jpg') 
    },
    { 
      question: "Excessive caffeine intake can negatively impact mental health by increasing:", 
      options: ["Happiness", "Muscle strength", "Anxiety and panic attacks", "Memory retention"],
      answer: "Anxiety and panic attacks",
      image: require('../../assets/health/question10.jpg') 
    },
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function Health() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [skippedQuestions, setSkippedQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [noticeVisible, setNoticeVisible] = useState(false);

    useEffect(() => {
        setQuestions(shuffleArray(allQuestions).slice(0, 10));
    }, []);

    const checkAnswer = (selectedOption) => {
        if (answeredQuestions.includes(currentQuestion)) {
            setNoticeVisible(true);
            return;
        }

        const isCorrect = selectedOption === questions[currentQuestion].answer;
        if (isCorrect) {
            setScore(score + 1);
        }

        setAnsweredQuestions([...answeredQuestions, currentQuestion]);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const unansweredSkippedQuestions = skippedQuestions.filter(q => !answeredQuestions.includes(q));
            if (unansweredSkippedQuestions.length > 0) {
                setModalVisible(true);
            } else {
                setQuizCompleted(true);
            }
        }
    };

    const restartGame = () => {
        setQuestions(shuffleArray(allQuestions).slice(0, 10));
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setSkippedQuestions([]);
        setAnsweredQuestions([]);
    };

    const goHome = () => {
        router.push("/(tabs)/");
    };

    const skipQuestion = () => {
        setSkippedQuestions([...skippedQuestions, currentQuestion]);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setModalVisible(false);
        setQuizCompleted(true);
    };

    const getResultMessage = () => {
        if (score === 10) {
            return "Perfect! you got it all!🎉🥳";
        } else if (score >= 5) {
            return "You've Passed! Keep it up!👍😄";
        } else {
            return "You've failed, try again!😞🙏";
        }
    };

    return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/d6/70/99/d670990fa86f31233a53a22d7bb2f4bc.jpg' }} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                {questions.length > 0 && !quizCompleted ? (
                    <>
                        <Text style={styles.questionCounter}>Question {currentQuestion + 1} / 10</Text>
                        <Image source={questions[currentQuestion].image} style={styles.questionImage} />
                        <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                        {questions[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => checkAnswer(option)} 
                                style={styles.optionButton}>
                                <Text style={styles.optionButtonText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.navigationButtons}>
                            <TouchableOpacity 
                                onPress={previousQuestion} 
                                style={styles.previousButton}>
                                <Text style={styles.buttonText}>Previous</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={skipQuestion} 
                                style={styles.skipButton}>
                                <Text style={styles.buttonText}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={restartGame} 
                                style={styles.restartButton}>
                                <Text style={styles.buttonText}>Restart</Text>
                            </TouchableOpacity>
                            {currentQuestion === questions.length - 1 && (
                                <TouchableOpacity 
                                    onPress={handleSubmitQuiz} 
                                    style={styles.submitButton}>
                                    <Text style={styles.buttonText}>Finalize!</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.quizCompletedText}>Quiz Completed!</Text>
                        <Text style={styles.scoreText}>Your Score: {score} / 10</Text>
                        <Text style={styles.resultMessage}>{getResultMessage()}</Text>
                        <TouchableOpacity 
                            onPress={restartGame} 
                            style={styles.restartButton}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity 
                    onPress={goHome} 
                    style={styles.homeButton}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView contentContainerStyle={styles.modalScrollContent}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Skipped Questions</Text>
                                <Text style={styles.modalText}>You have skipped the following questions:</Text>
                                {skippedQuestions.filter(q => !answeredQuestions.includes(q)).map((questionIndex) => (
                                    <Text key={questionIndex} style={styles.modalQuestionText}>
                                        Question {questionIndex + 1}: {questions[questionIndex].question}
                                    </Text>
                                ))}
                                <Text style={styles.modalTextConfirm}>Are you sure you want to submit the quiz?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity 
                                        onPress={() => setModalVisible(false)} 
                                        style={styles.modalCancelButton}>
                                        <Text style={styles.buttonText}>Go back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={handleSubmitQuiz} 
                                        style={styles.modalSubmitButton}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={noticeVisible}
                    onRequestClose={() => {
                        setNoticeVisible(!noticeVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Notice</Text>
                            <Text style={styles.modalText}>You've already answered this question. Please press 'skip'/'previous' button.</Text>
                            <TouchableOpacity 
                                onPress={() => setNoticeVisible(false)} 
                                style={styles.modalCancelButton}>
                                <Text style={styles.buttonText}>Alrighty!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: 'rgba(128, 128, 128, 0.9)', borderRadius: 10, margin: 20 },
  questionCounter: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  questionImage: { width: 200, height: 200, marginVertical: 20, borderRadius: 10 },
  questionText: { fontSize: 16, marginVertical: 20, color: 'white', textAlign: 'center' },
  optionButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5, marginVertical: 5, width: '80%', alignItems: 'center' },
  optionButtonText: { color: 'white' },
  navigationButtons: { flexDirection: 'row', marginTop: 20 },
  previousButton: { backgroundColor: 'orange', padding: 10, borderRadius: 5, marginHorizontal: 10 },
  skipButton: { backgroundColor: 'purple', padding: 10, borderRadius: 5, marginHorizontal: 10 },
  restartButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginHorizontal: 10 },
  submitButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, marginHorizontal: 10 },
  quizCompletedText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' },
  scoreText: { fontSize: 20, color: 'white' },
  resultMessage: { fontSize: 18, color: 'white', marginVertical: 10, textAlign: 'center' },
  homeButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, marginVertical: 20, width: '80%', alignItems: 'center' },
  buttonText: { color: 'white' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalScrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 20 },
  modalTextConfirm: { fontSize: 16, marginBottom: 20, fontWeight: 'bold' },
  modalQuestionText: { fontSize: 16, marginBottom: 5 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalCancelButton: { backgroundColor: 'grey', padding: 10, borderRadius: 5 },
  modalSubmitButton: { backgroundColor: 'green', padding: 10, borderRadius: 5 },
});
