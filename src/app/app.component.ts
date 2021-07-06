import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyAD6Nq77xmIWgd5s4wPsuQDTqIo4ghZTEE",
      authDomain: "jta-instagram-clone-608a7.firebaseapp.com",
      projectId: "jta-instagram-clone-608a7",
      storageBucket: "jta-instagram-clone-608a7.appspot.com",
      messagingSenderId: "1042367298112",
      appId: "1:1042367298112:web:fa044e80e293ceced0bda5",
      measurementId: "G-PGF7SKT7QD",
      databaseURL: "https://jta-instagram-clone-608a7-default-rtdb.firebaseio.com/"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
  }
  
}
