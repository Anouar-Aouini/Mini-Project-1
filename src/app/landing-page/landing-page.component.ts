import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private fb: FormBuilder,public router:Router) { }
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public errorMessage = {msg:"",show:false};

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
    if (local) {
      let users = [...JSON.parse(local)];
    if (!users || !users.filter(el => el.email === this.loginForm.value.email).length) {
        this.errorMessage.show = true;
        this.errorMessage.msg = "you are not registered yet"
      setTimeout(() => {
          this.errorMessage.show = false;
      }, 2000);
    } else {
      for (let i of users) {
        if (i.email === this.loginForm.value.email && i.password === this.loginForm.value.password) {
          localStorage.setItem('user', JSON.stringify(i));
          this.router.navigate(["/articles"])
        } else {

          this.errorMessage.msg = "check your password"
          this.errorMessage.show = true;
          setTimeout(() => {
          this.errorMessage.show = false;
          }, 2000);
        }
      }
      }
    } else {
      this.errorMessage.msg = "you are not registered yet"
      this.errorMessage.show = true;
      console.log(this.errorMessage)
        setTimeout(() => {
        this.errorMessage.show = false;
        }, 2000);
    }
  }


  onSubmitRegister() {
     let local: string = <string>localStorage.getItem("users");
     let user={id: Math.random(),
         email: this.registerForm.value.email,
         username: this.registerForm.value.username ,
         password: this.registerForm.value.passOne
     }
    console.log(JSON.parse(local))

    if (local && [...JSON.parse(local)].filter(el => el.email === this.registerForm.value.email).length === 1) {
      this.errorMessage.msg = "This email is already used"
      this.errorMessage.show = true;
      setTimeout(() => {
      this.errorMessage.show = false;
      }, 2000);

    }
    else if (local) {
      let users = [user, ...JSON.parse(local)];
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(["/articles"])
    } else {
      localStorage.setItem("users", JSON.stringify([user]))
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(["/articles"])
    }

  }

}
