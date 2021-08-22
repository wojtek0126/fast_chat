
import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ThemeProvider,
   Flex,
   Image,
   Button,
   Input,
   } from 'theme-ui';
import theme from './styles/theme';


firebase.initializeApp({
  apiKey: "AIzaSyCn4sCjhmPTpljpeHRigEUIhuHWLKhf-cQ",
  authDomain: "superchat-92453.firebaseapp.com",
  projectId: "superchat-92453",
  storageBucket: "superchat-92453.appspot.com",
  messagingSenderId: "344093669806",
  appId: "1:344093669806:web:f250e557cd52a55d7b703f",
  measurementId: "G-XT686JS6R1"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        
        <header>
          <h1>⚛️🔥💬</h1>
          <SignOut />
        </header>
  
        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>

      </div>
    </ThemeProvider>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
      <p>This is my personal chat. Happy chat</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <Button className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>   
    <Flex id={'main'} sx={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: '2',
      opacity: '0.85'
    }}>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </Flex>
    <form className='form' onSubmit={sendMessage} >
      <Flex  sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        marginTop: '3',        
        position: 'fixed',
        left: 0,
        bottom: 0
      }}>
        <Input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="your message..." 
        sx={{
          backgroundColor: 'inputBackground',
          margin: '20px',
          marginTop: '30px',
          borderRadius: '10px'
        }}
        />
        <Button type="submit" disabled={!formValue}
        sx={{
          borderRadius: '50%',
          position: 'absolute',
          right: '10px'
        }}
        >🕊️</Button>
      </Flex>
    </form>    
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <Flex sx={{
        borderRadius: '10px',
        backgroundColor: `${messageClass}`,
        color: 'messageText',
        width: '80vw',
        wordBreak: 'break-word',
        position: 'relative',    
        margin: '30px',
        padding: '2', 
        marginBottom: '70px' 
      }}>
      <Image src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} sx={{
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        position: 'absolute',
        left: '-25px',
        top: '-20px'
      }} />
      <p>{text}</p>
    </Flex>
  </>)
}


export default App;