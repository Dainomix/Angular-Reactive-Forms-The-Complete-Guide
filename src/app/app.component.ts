import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  ngOnInit() {
    // FormControl(initial state of this control
    //            , single validator or an array of validator that we want to apply to this control
    //            , potential asynchronous validators)
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male'),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

}
