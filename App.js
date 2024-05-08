import React from 'react';
import {StoreProvider} from '../store';
import { firebase } from '@react-native-firebase/firestore';
import auth from  '@react-native-firebase/auth';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from "./navigations/Root";

const App = () => {
  const USERS = firestore().collection("USERS")
  const admin = {
    fullName: "Admin",
    email: " PaseutHsindota2@gmail.com",
    password: " 123456",
    phone: "0333093473",
    role: "admin"
  }
  useEffect(()=>{
    USERS.doc(admin.email)
    .onSnapshot(
      u=>{
        if(!u.existe)
        {
          auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(Response =>
          {
            USERS.doc(admin.email).set(admin)
            console.log("Add new account admin")
          }
        )
        }
      }
    )
  }
, [])
 return (
  <StoreProvider>
    <NavigationContainer>
      <Root/>
    </NavigationContainer>
  </StoreProvider>
 )
}