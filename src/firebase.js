import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAAQLQmZpk8jFQwtaPsAPsQBGovZ71Tpo8",
    authDomain: "quiz-app-typescript-f8f41.firebaseapp.com",
    projectId: "quiz-app-typescript-f8f41",
    storageBucket: "quiz-app-typescript-f8f41.appspot.com",
    messagingSenderId: "727869438645",
    appId: "1:727869438645:web:fbea095a14404bdac39cfc"
};

firebase.initializeApp(config)

export default firebase