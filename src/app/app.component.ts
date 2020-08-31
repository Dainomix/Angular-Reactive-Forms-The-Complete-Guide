import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];

  /**
   * In a TD approach, we already imported ngForm from it (@angular/forms)
   * now ngForm was this automatically created wrapper.
   * we could say but it was wrapping a FormGroup in the end, because in Angular, a form in the end is just a group of controls.
   * and this is what a form group holds.
   * 
   * Therefore, the overall form also is just a form group.
   * This gives us a property with which we can work which will hold our form in the ed.
   */
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    // FormControl(initial state of this control
    //            , single validator or an array of validator that we want to apply to this control
    //            , potential asynchronous validators)
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });

    /* 
     // valueChanges
     this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    */
   this.signupForm.statusChanges.subscribe(
    (status) => console.log(status)
  );

  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  /**
   * Alternative way of getControls(): setting up getter and use an alternative type casting syntax
   * 
   * get controls() {
   *  return (this.signupForm.get('hobbies') as FormArray).controls;
   * }
   */

   /**
    * A validator in the end is just a function which gets executed by Angular automatically when it checks the validity of the FormControl
    * and it checks that validity whenever you change that control.
    * validator is just a function. 
    * 
    * {s: string}
    * => it should have any key which can be interpreted as a string and this is just TypeScript syntax for saying
    * 'hey we want to have a key-value pair where the key again can be interpreted as a string which is true for a key in an object in general.
    * 
    * {s: string}: boolean
    * => More importantly, the value of that key-value pair, that should be a boolean.
    * => this function should return in the end: {nameIsForbidden: true}
    *    nameIsForbidden would be the key name which is interpreted as a string and it could be true.
    *    So this is what this function should return in the end
    * => for example, the message itself, the key name is up to us and therefore we can now add the logic in this function.
    * 
    *    'We want to check if the value of the control is part of the forbiddenUSernames array'
    *
    * IF VALIDATION IS SUCCESSFUL, WE HAVE TO PASS NOTHING OR NULL
    * WE SHOULD NOT PASS OBJECT WITH FALSE. FOR EXAMPLE {'nameIsforbidden': false} CANNOT BE PASSED.
    * IT SHOULD BE NULL OR WE SIMPLY OMIT THE RETURN STATEMENT.
    * 
    * ERROR will occur that Cannot read property 'forbiddenUsernames' of undefiend.
    * => This Error has something to do with Javascript handles this.
    * 
    * In this function we are accessing this in this.forbiddenUsernames.IndexOf...
    * Now this might look all right because I'm in this class and i choos this forbiddenUsernam
    * BUT THINK ABOUT WHO IS CALLING THESE FORBIDDENAMES.
    * 
    * We are not calling it from inside this class, Angular will call it when it checks the validity,
    * At this point of time, this will not refer to our class here.
    * So to fix this, we actually need to bind this, the good old javascript trick to maek sure that this refers to what we want it to refer to.
    * => this.forbiddenNames.bind(this) in FormControl() for username
    * 
    * we are checking If control value is part of this forbiddenUsernames,
    * the condition( this.forbiddenUSernames.indexOf(control.value) ) will return -1, If it is not part, well -1 is interpreted as true though.
    * => So we need to check if this is not equal to -1, So if this is not equal to -1, that means we did find it, that means it is invalid.
    */
   forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForBidden': true};
    }
    return null;
   }

   forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
     const promise = new Promise<any>((resolve, reject) => {
       setTimeout(() => {
         if(control.value === 'test@test.com') {
           resolve({'emailIsForbidden': true});
         } else {
           resolve(null);
         }
       },1500);
     });
     return promise;
   }
}
