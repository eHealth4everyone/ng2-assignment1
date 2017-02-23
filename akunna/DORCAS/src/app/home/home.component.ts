import {Component} from '@angular/core';
import {Employee} from '../models/employee.model';
import {FormPoster } from'../services/form-poster.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  model = new Employee('','',false,'default',
                        'Lugbe'); 
  hasStateError = false; 

constructor(private formPoster: FormPoster){
  }    

submitForm(form: NgForm){   
  // validate form 
  this.validateState(this.model.state);
  if(this.hasStateError)
  return;  
  
this.formPoster.postEmployeeForm(this.model);
    .subscribe(   
      data => console.log('success: ', data),
      err => console.log('error: ', err)
    ) 
} 


validateState(value){ 
  if(this.model.state === 'default')
   this.hasStateError = true;
  else
  this.hasStateError = false;
}   
  }  