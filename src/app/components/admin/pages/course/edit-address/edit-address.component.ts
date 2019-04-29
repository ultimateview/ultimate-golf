import { Component, OnInit, Input } from '@angular/core';

import { ILocationAddress } from './../../../../../models/location/address.model';
import { AddressService } from './../../../../../shared/services/golf/address.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  @Input() courseId: string;
  address: ILocationAddress = {
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    courseId: this.courseId
  };

  addressForm: FormGroup = new FormGroup({
    street1: new FormControl(this.address.street1),
    street2: new FormControl(this.address.street2),
    city: new FormControl(this.address.city),
    state: new FormControl(this.address.state),
    zip: new FormControl(this.address.zip),
  });

  constructor(private _svc: AddressService) { }

  ngOnInit() {
    this._svc.get(this.courseId).subscribe((item) => { this.setForm(item); });
  }

  setForm(item) {
    this.address = item;
  }

  async saveAddress() {
    // console.log(this.addressForm);
    // console.log(this.address);
    // this._svc.add(this.address).subscribe((item) => { this.setForm(item); });
    const saveItem = {
      street1: this.addressForm.get('street1').value,
      street2: this.addressForm.get('street2').value,
      city: this.addressForm.get('city').value,
      state: this.addressForm.get('state').value,
      zip: this.addressForm.get('zip').value,
      courseId: this.courseId
    };

    if (!this.address) {
      const newItem = await this._svc.add(saveItem);
      this.address = newItem;
    } else {
      this.address.street1 = saveItem.street1;
      this.address.street2 = saveItem.street1;
      this.address.city = saveItem.city;
      this.address.state = saveItem.state;
      this.address.zip = saveItem.zip;
      this._svc.update(this.address);
    }
  }

}
