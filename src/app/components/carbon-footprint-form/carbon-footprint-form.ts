import { Component } from '@angular/core';
import { CarbonFootprintCompute } from '../../services/carbon-footprint-compute';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.scss',
})
export class CarbonFootprintForm {

  protected travelForm: FormGroup;

  constructor(private readonly cfc: CarbonFootprintCompute){
    this.travelForm = new FormGroup({
        distance: new FormControl(null, [Validators.required, Validators.min(0)]),
        date: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required, Validators.pattern(/(car|plane|train)/)]),
        carConsumption: new FormControl(null, [Validators.min(0)])
      }, { validators: this.requiredConsumptionValidator }
    );

    this.travelForm.get('type')?.valueChanges.subscribe(() => {
      this.travelForm.controls['carConsumption'].clearValidators();
      this.travelForm.controls['carConsumption'].updateValueAndValidity();
    });
  }

  requiredConsumptionValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const type = control.get('type');
    const consumption = control.get('carConsumption');
    return type && consumption && type.value === "car" && !consumption.value ? { requiredCarConsumption: true } : null;
  };

  onClickSubmit() {
    if(this.travelForm.valid){
      const distanceKm = this.travelForm.get('distance')?.value;
      const consumptionPer100Km = this.travelForm.get('carConsumption')?.value ?? 0;
      const type = this.travelForm.get('type')?.value;
      const date = this.travelForm.get('date');
      this.cfc.addTravel({ distanceKm, consumptionPer100Km, type })
    }
  }

}
