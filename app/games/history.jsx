import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

const allQuestions = [
    { 
        question: "Who was the first President of the United States?", 
        options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
        answer: "George Washington",
        image: require('../../assets/history/question1.png') 
    },
    { 
        question: "What year did World War II end?", 
        options: ["1943", "1945", "1947", "1950"],
        answer: "1945",
        image: require('../../assets/history/question2.jpg') 
    },
    { 
        question: "Which ancient civilization built the pyramids?", 
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        answer: "Egyptians",
        image: require('../../assets/history/question3.jpg') 
    },
    { 
        question: "During what period did the title of Dictator originate?", 
        options: ["Roman Republic", "Napoleonic Europe", "Soviet Union", "Victorian Era"],
        answer: "Roman Republic",
        image: require('../../assets/history/question4.jpg') 
    },
    { 
        question: "What was the name of the Ukrainian nuclear power plant that was the site of a nuclear disaster in April 1986?", 
        options: ["Fukushima", "Three Mile Island", "Zaporizhzhia", "Chernobyl"],
        answer: "Chernobyl",
        image: require('../../assets/history/question5.jpg') 
    },
    { 
        question: "Who was the first explorer to sail around the world?", 
        options: ["Christopher Columbus", "Ferdinand Magellan", "James Cook", "Vasco da Gama"],
        answer: "Ferdinand Magellan",
        image: require('../../assets/history/question6.jpg') 
    },
    { 
        question: "It is a series of protests and demonstrations in China in the spring of 1989 that culminated on the night of June 3–4 with a government crackdown on the demonstrators", 
        options: ["Tiananmen Square incident", "Cultural Revolution", "May Fourth Movement", "Boxer Rebellion"],
        answer: "Tiananmen Square incident",
        image: require('../../assets/history/question7.jpeg') 
    },
    { 
        question: "Who first represented the Earth as a sphere?", 
        options: ["Galileo Galilei", "Eratosthenes", "Pythagoras", "Aristotle"],
        answer: "Pythagoras",
        image: require('../../assets/history/question8.png') 
    },
    { 
        question: "Who was the leader of Nazi Germany during World War II?", 
        options: ["Joseph Stalin", "Adolf Hitler", "Winston Churchill", "Franklin D. Roosevelt"],
        answer: "Adolf Hitler",
        image: require('../../assets/history/question9.jpeg') 
    },
    { 
        question: "Which empire was ruled by Julius Caesar?", 
        options: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
        answer: "Roman Empire",
        image: require('../../assets/history/question10.jpeg') 
    }
];
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function history() {
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
