
import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { ThemeProvider,
   Box,
   Flex,
   Image,
   Button,
   Input,    
   Paragraph
   } from 'theme-ui';   
import theme from './styles/theme';

import background from './assets/bubbles777.jpg'

import { btnPrimary } from './styles/settings';


firebase.initializeApp({
  apiKey: "AIzaSyDwZnASFQ0a8BJeCiILgeKY0q-HoZgEKp8",
  authDomain: "eazzychat.firebaseapp.com",
  projectId: "eazzychat",
  storageBucket: "eazzychat.appspot.com",
  messagingSenderId: "142556453725",
  appId: "1:142556453725:web:8ea88bffb217e620e226b4"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
          background: `url(${background})`
      }} className="App">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="0.8" d={`M0,192L15,197.3C30,203,60,213,90,213.3C120,213,150,203,180,192C210,181,240,171,270,154.7C300,139,330,117,360,144C390,171,420,245,450,234.7C480,224,510,128,540,74.7C570,21,600,11,630,37.3C660,64,690,128,720,181.3C750,235,780,277,810,288C840,299,870,277,900,245.3C930,213,960,171,990,170.7C1020,171,1050,213,1080,224C1110,235,1140,213,1170,170.7C1200,128,1230,64,1260,48C1290,32,1320,64,1350,85.3C1380,107,1410,117,1425,122.7L1440,128L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z`}></path></svg>      
        <header>
          <h1>The Eazzy Chat</h1>
          <SignOut />
        </header>
  
        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>

      </Box>
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
      <Button className="sign-in" onClick={signInWithGoogle} sx={btnPrimary}>Sign in with Google</Button>
      <Paragraph sx={{
        fontWeight: '600'
        }}>This is my personal chat. Happy chat</Paragraph>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <Button className="sign-out" onClick={() => auth.signOut()} sx={btnPrimary}>Sign Out</Button>
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
        sx={btnPrimary}
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