import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "password-manager-f856b", appId: "1:741656266227:web:71c08a5c23f87fd09efe86", storageBucket: "password-manager-f856b.firebasestorage.app", apiKey: "AIzaSyA3r3wobNoa8sPvOggFxpoGoac3Av-TCYs", authDomain: "password-manager-f856b.firebaseapp.com", messagingSenderId: "741656266227" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
