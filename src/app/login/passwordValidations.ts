import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
      
       let confirmPassword = AC.get('cpassword').value; // to get value in input tag
        if(password != confirmPassword) {
            
            AC.get('cpassword').setErrors( {MatchPassword: true} )
        } else {
             AC.get('cpassword').setErrors( {MatchPassword: false} )
            return null
        }
    }
}