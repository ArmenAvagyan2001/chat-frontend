import { initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_6czD9AGTHopEvfDWng5bxkw4T59W-S0",
    authDomain: "my-chat-20375.firebaseapp.com",
    projectId: "my-chat-20375",
    storageBucket: "my-chat-20375.appspot.com",
    messagingSenderId: "144543513686",
    appId: "1:144543513686:web:2348168e286cab6ab40ff7",
    measurementId: "G-1Y2NGRNLRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

const requestPermission = () => {
    Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
            console.log('notification permission granted')
            await getToken(messaging, {vapidKey: "BKWPNyWKliwk_btQgjDRsR8SJnecXlX1t0L9sB90puCfCFcDFuVCsLGIfH_YQMQMavk7UzfZO31E8B-yzh1d4Oc"})
                .then(currentToken => {
                    if (currentToken) {
                        console.log(currentToken)
                    } else {
                        console.log('not token')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    })
}

requestPermission()