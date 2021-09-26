
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
   Paragraph,
   Heading,
   } from 'theme-ui';   
import theme from './styles/theme';
import TextAnimation from 'react-animate-text';
import ScrollText from 'react-scroll-text';
import Wave from 'react-wavify';
import ScrollTop from "react-scrolltop-button";
import { BsArrowBarUp } from 'react-icons/bs';


import background from './assets/1035.png';

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
  <Wave mask="url(#mask)" fill="#1277b0" >
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="0" stopColor="white" />
      <stop offset="0.5" stopColor="black" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)"  />
    </mask>
  </defs>
</Wave>   
        <header>
          <Flex sx={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            color: 'text2',
            marginTop: 20,
            marginBottom: 20,
            fontSize: '50px',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'      
            }}><Paragraph>The</Paragraph><Paragraph sx={{
              color: 'text3'
            }}>Eazzy</Paragraph><Paragraph sx={{
              color: 'text4'
            }}>Chat</Paragraph></Flex>
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
      <TextAnimation>
        <Paragraph sx={{
          color: 'text2',
          fontWeight: '600',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          marginTop: 20,
          marginBottom: 20 
          }}>Welcome to my personal chat. Happy chat</Paragraph>
      </TextAnimation>
      <Heading sx={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            color: 'text2',
            marginTop: 80,
            marginBottom: 20,
            fontSize: '40px'      
            }}> 
              <ScrollText>
                This is my personal chat made with React.js and several of it's libraries. Feel free to sign in and type in whatever You want.
                This app is evolving so next time around it will most likely look and work different. Also the code and file structure
                will be improved. Right now this chat is free for anyone to test, however maximum number of comments is currently
                set to 50...have fun!                 
              </ScrollText>         
          </Heading>  
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
  const query = messagesRef.orderBy('createdAt').limit(200);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  // const [placeholder, setPlaceholder] = useState('your message...');



  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    
    if (formValue.length > 2 || formValue.length >= 500) {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })      
      setFormValue("");
    };

    
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<> 
    <Flex id={'main'} sx={{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop: '2',
      opacity: '0.85',     
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
        <Input defaultValue={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='your message...' 
        sx={{
          backgroundColor: 'inputBackground',
          margin: '20px',
          marginTop: '30px',
          borderRadius: '10px',
          marginLeft: 77,
          "@media (max-width: 500px)": { 
            width: '70vw',     
            marginLeft: 50,
            marginRight: 50,
            height: 50,
            marginBottom: 26           
         }
        }}
        />
         <Flex sx={{        
    }}> 
           <Button type="submit" disabled={!formValue}
        sx={{
          backgroundImage:'linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)',
          cursor: 'pointer',
          margin: '10px',
          padding: '15px 45px',
          textAlign: 'center',
          textTransform: 'uppercase',
          transition: '0.5s',
          backgroundSize: '200% auto',
          color: 'white',            
          boxShadow: '0 0 20px #eee',
          borderRadius: '10px',      
          '&:hover, &:focus': {  
            backgroundPosition: 'right center', 
            color: '#fff',
            textDecoration: 'none'
         },
         paddingRight: 60,
         marginRight: 67,
         "@media (max-width: 500px)": { 
           position: 'absolute',         
           marginRight: 4,
           right: -25,
           bottom: 12,
           padding: 15,
           height: 50
        }
        }}
        >🕊️</Button>
    </Flex>
   
      </Flex>
    </form>    
    <ScrollTop
        text="^"
        distance={0}
        breakpoint={0}
        style={{
          backgroundImage:'linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)',
          cursor: 'pointer',
          margin: '10px',  
          border: 'none',         
          textAlign: 'center',
          textTransform: 'uppercase',
          transition: '0.5s',
          backgroundSize: '200% auto',
          color: 'white',            
          boxShadow: '0 0 20px #eee',
          borderRadius: '10px',      
          '&:hover, &:focus': {  
            backgroundPosition: 'right center', 
            color: '#fff',
            textDecoration: 'none'
         },
         position: 'fixed',
         bottom: 12,
         left: 0,     
         zIndex: '15',
         height: 50
        }}
        className="scroll-your-role"
        speed={1000}
        target={75}
        icon={<BsArrowBarUp />}
      />
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
      <Paragraph>{text}</Paragraph>
    </Flex>
  </>)
}


export default App;