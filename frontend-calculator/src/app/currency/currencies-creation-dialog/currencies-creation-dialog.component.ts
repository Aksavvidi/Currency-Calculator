import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Currencies } from 'shared';

@Component({
  selector: 'app-currencies-creation-dialog',
  templateUrl: './currencies-creation-dialog.component.html',
  styleUrls: ['./currencies-creation-dialog.component.css']
})
export class CurrenciesCreationDialogComponent {
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private dialogRef:MatDialogRef<CurrenciesCreationDialogComponent>
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
      this.currencyService.createCurrency(data).subscribe((response) => {
        console.log(response);
      alert('Currency created successfully')
      this.form.reset();
      window.location.reload();
      });
      console.log('Currency creation data', data);
      this.dialogRef.close('Currency created successfully');
    }else{
      console.log('Form is not valid');
      alert('Currency data is not valid. Please try again.')
    }
  }
  
  onCancel(): void{
    // Close the dialog
    this.dialogRef.close();
   }

}
