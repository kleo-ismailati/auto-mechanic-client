import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Auto} from "../../models/auto.model";
import {Client} from "../../models/client.model";

@Component({
  selector: 'app-auto-details',
  templateUrl: './auto-details.component.html',
  styleUrls: ['./auto-details.component.css']
})
export class AutoDetailsComponent implements OnInit {

  @Input() auto!: Auto;
  @Input() image!: Client;
  @Output() changeImage = new EventEmitter<FormData>();
  @Output() updateAuto = new EventEmitter<Auto>();
  @Output() isAddingBooking = new EventEmitter<boolean>();

  updatedAuto!: Auto;

  selectedFile: File | null = null;

  isEdit: boolean = false;

  ngOnInit(): void {
    this.updatedAuto = {
      id: this.auto.id,
      autoType: this.auto.autoType,
      autoDescription: this.auto.autoDescription,
      autoModel: this.auto.autoModel,
      year: this.auto.year,
      color: this.auto.color
    };
  }


  autoUpdate() {
    this.isEdit = false;
    this.updateAuto.emit(this.updatedAuto);
  }

  enableEdit() {
    this.isEdit = true;

    this.updatedAuto = {
      id: this.auto.id,
      autoType: this.auto.autoType,
      autoDescription: this.auto.autoDescription,
      autoModel: this.auto.autoModel,
      year: this.auto.year,
      color: this.auto.color
    };
  }

  cancel() {
    this.isEdit = false;
    this.ngOnInit();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmitImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.changeImage.emit(formData);

      this.isEdit = false;
    }
  }

  addNewBooking() {
    this.isAddingBooking.emit(true);
  }
}
