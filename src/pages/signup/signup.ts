import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	public signupForm: FormGroup;
    loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public authProvider: AuthProvider, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  	
  	this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        confirmpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        birthday: ['', Validators.compose([Validators.required])],
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])]
      }, {validator: this.matchingPasswords('password', 'confirmpassword')});

    this.menuCtrl.enable(false, 'MainMenu')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

	matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		console.log("Test Validation");
		return (group: FormGroup): {[key: string]: any} => {
		  let password = group.controls[passwordKey];
		  let confirmPassword = group.controls[confirmPasswordKey];

		  if (password.value !== confirmPassword.value) {
		    return {
		      mismatchedPasswords: true
		    };
		  }
		}
	}

	calculateAge(birthday) { // birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	signupUser(){
	  if (!this.signupForm.valid){
	    console.log(this.signupForm.value);
	  } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
        if(this.calculateAge(new Date(this.signupForm.value.birthday)) < 18){
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: "You must to be at least 18 years old",
              buttons: [
              {
                text: "Ok",
              }
              ]
            });
            alert.present();
          });
        }else{
          let first = this.signupForm.value.firstname;
          let last = this.signupForm.value.lastname;
    	    this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password, first, last, this.signupForm.value.phone, this.signupForm.value.birthday)
    	    .then(() => {
    	      this.loading.dismiss().then( () => {
    	        this.navCtrl.setRoot(HomePage);
    	      });
    	    }, (error) => {
    	    	console.log(error);
    	      this.loading.dismiss().then( () => {
    	        let alert = this.alertCtrl.create({
    	          message: error.message,
    	          buttons: [
    	            {
    	              text: "Ok",
    	              role: 'cancel'
    	            }
    	          ]
    	        });
    	        alert.present();
    	      });
    	    });
      }
	  }
	}


}
