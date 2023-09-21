import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { ExchangeRateService } from '../exchange-rate.service';
import { exchangeRate } from '../exchange-rate.interfaces';

@Component({
  selector: 'app-pop-up-uexchange-rate',
  templateUrl: './pop-up-uexchange-rate.component.html',
  styleUrls: ['./pop-up-uexchange-rate.component.css']
})
export class PopUpUExchangeRateComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private exchangeRateService: ExchangeRateService, 
    private dialogRef: MatDialogRef<PopUpUExchangeRateComponent> 
    ){
      this.form = this.fb.group({
        baseCurrency: ['', [Validators.required]],
        targetCurrency: ['', [Validators.required]],
        rate: ['', [Validators.required]]
      });
    }

    onSubmit():void{
      if(this.form.value){
        console.log(this.form.value);
        const rate = this.form.value as exchangeRate;
        this.exchangeRateService.updateExchangeRate(rate.baseCurrency,rate.targetCurrency, rate).subscribe((response) => {
          console.log(response);
        alert('Exchange Rate updated successfully')
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
