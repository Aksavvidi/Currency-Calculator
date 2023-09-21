import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { exchangeRate } from '../exchange-rate.interfaces';
import { ExchangeRateService } from '../exchange-rate.service';
import { response } from 'express';

@Component({
  selector: 'app-exchange-rate-creation-dialog',
  templateUrl: './exchange-rate-creation-dialog.component.html',
  styleUrls: ['./exchange-rate-creation-dialog.component.css']
})
export class ExchangeRateCreationDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exchangeRateService: ExchangeRateService, 
    private dialogRef: MatDialogRef<ExchangeRateCreationDialogComponent>
  ){
    this.form = this.fb.group({
      baseCurrency: ['', [Validators.required]],
      targetCurrency: ['', [Validators.required]],
      rate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if(this.form.value) {
      const rate = this.form.value as exchangeRate;
      this.exchangeRateService.createExchangeRate(rate).subscribe((response) => {
        console.log(response);
        alert('Exchange Rate created successfully')
        this.form.reset(); 
        window.location.reload();
      });
      console.log('Exchange Rate creation data', rate);
      this.dialogRef.close('Exchange Rate created successfully');
    }else{
      console.log('Form is not valid');
      alert('Exchange Rate data is not valid. Please try again.')
    }
  }
  
  onCancel(): void{
    // Close the dialog
    this.dialogRef.close();
   }
}
