import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../currency.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Currencies } from 'shared';

@Component({
  selector: 'app-pop-up-currency',
  templateUrl: './pop-up-currency.component.html',
  styleUrls: ['./pop-up-currency.component.css']
})
export class PopUpCurrencyComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private dialogRef:MatDialogRef<PopUpCurrencyComponent>
  ){
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }
  onSubmit():void{
    if(this.form.value){
      console.log(this.form.value);
      const data = this.form.value as Currencies;
      this.currencyService.updateCurrency(data.code, data).subscribe((response) => {
        console.log(response);
      alert('Currency updated successfully')
      this.form.reset();
      window.location.reload();
      })
    }else{
      console.log('Form is not valid');
    }
  }
  
  onCancel(): void{
    // Close the dialog
    this.dialogRef.close();
   }

}

