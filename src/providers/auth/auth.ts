
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

	private usersCollection: AngularFirestoreCollection<any>;
  	userRef: any;
  	users: Observable<any[]>;

  constructor(public fistore: AngularFirestore, public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    this.usersCollection = fistore.collection<any>('users');
    this.fistore.collection('users', useref => this.userRef = useref);
    //this.users = this.profilesCollection.valueChanges();
  }

	loginUser(email: string, password: string): Promise<any> {
	  return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	signupUser(email: string, password: string, first: string, last: string, phone: string, birthday: string): any {
    	return new Promise( (Resolve, Reject) => {
      		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        	.then( newUser => {
          		this.usersCollection.doc(newUser.uid)
		            .set({
		              uid: newUser.uid,
		              email: email,
		              firstName: first,
		              lastName: last,
		              fullName: `${first} ${last}`,
		              phone: phone,
		              birthday:birthday,
		              created: firebase.firestore.FieldValue.serverTimestamp(),
		              thumbnail: "assets/user/user-default.jpg"
		            }).then((newProfile)=> {
			            console.log(newProfile);
			            /*this.newsFeedService.addFeed({
			              type: NEWS_FEED_TYPE.NEW_USER,
			              text: this.newsFeedService.getText(NEWS_FEED_TYPE.NEW_USER, {
			                fullName: isDefined(first) && isDefined(last) ? `${first} ${last}` : null,
			              })
			            });*/
			            Resolve(true);
			        }, (err)=> {
			            console.log(err);
			            Resolve(false);
			        });
			});
    	});
	}


	resetPassword(email: string): Promise<void> {
	  return firebase.auth().sendPasswordResetEmail(email);
	}


	logoutUser(): Promise<void> {
	  return firebase.auth().signOut();
	}

}
