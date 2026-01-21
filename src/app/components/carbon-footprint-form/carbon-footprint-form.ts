import { Component } from '@angular/core';
import { CarbonFootprintCompute } from '../../services/carbon-footprint-compute';
import { Travel } from '../../models/travel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
      consumption: new FormControl(null, [Validators.required, Validators.min(0)]),
      date: new FormControl(null, [Validators.required])
    })
  }

  onClickSubmit() {
    if(this.travelForm.valid){
      const distanceKm = this.travelForm.get('distance')?.value;
      const consumptionPer100Km = this.travelForm.get('consumption')?.value;
      const date = this.travelForm.get('date');
      this.cfc.addTravel({ distanceKm, consumptionPer100Km })
    }
  }

}
