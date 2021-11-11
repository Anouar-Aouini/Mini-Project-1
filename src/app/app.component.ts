import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private fb: FormBuilder) { }
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;

  ngOnInit():void {

      this.loginForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]],
      });
    this.registerForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      passOne: ["", [Validators.required, Validators.minLength(6)]],
      passTwo: ["",[ Validators.required, Validators.minLength(6)]],
      username:["",Validators.required]
    });
        this.registerForm.get("passTwo")?.valueChanges.subscribe(password => {
          const passOne = this.registerForm.get("passOne");
          const passTwo = this.registerForm.get("passTwo");
      if (passOne?.value === password) {
      } else {
        passTwo?.setErrors({misMatch:true})
      }
    })

        this.registerForm.get("passOne")?.valueChanges.subscribe(passOne => {
        const passTwo = this.registerForm.get("passTwo");
        if (passTwo?.value === passOne) {
      } else {
          passTwo?.setErrors({misMatch:true})
      }
    })

  }
    get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

    get username() {
    return this.registerForm.get('username');
   }

  get registerEmail() {
    return this.registerForm.get('email');
  }

  get passOne() {
    return this.registerForm.get('passOne');
  }
    get passTwo() {
    return this.registerForm.get('passTwo');
    }


  onSubmitLogin() {
    let local: string = <string>localStorage.getItem("users");
    let users = [this.registerForm.value, ...JSON.parse(local)];
    if (!users.length || !users.filter(el=>el.email===this.loginForm.value.email).length) {
        console.log("you are not registered yet")
    } else {
      for (let i of users) {
        if (i.email === this.loginForm.value.email) {
          if (i.passOne === this.loginForm.value.password) {
            console.log("you are welcome")
          } else {
            console.log("check your password")
          }
        }
      }
    }

  }
  onSubmitRegister() {

    let local: string = <string>localStorage.getItem("users");
    console.log(JSON.parse(local))
    if (local) {
      let users = [this.registerForm.value, ...JSON.parse(local)];
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users);
    } else {
      localStorage.setItem("users",JSON.stringify([this.registerForm.value]))
    }





   // localStorage.setItem("users",JSON.stringify([this.registerForm.value,JSON.parse(localStorage.getItem("users"))]) )
  }
   // "users",JSON.stringify([JSON.parse(localStorage.getItem("users")),JSON.stringify(this.registerForm.value)])
  //   get password() {
  //   return this.registerForm.get('password');
  // }
  //   get confirmPassword() {
  //   return this.registerForm.get('confirmPassword');
  //   }

}
