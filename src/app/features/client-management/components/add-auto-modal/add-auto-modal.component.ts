import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AutoCreate} from "../../models/auto-create.model";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-auto-modal',
  templateUrl: './add-auto-modal.component.html',
  styleUrls: ['./add-auto-modal.component.css']
})
export class AddAutoModalComponent implements OnInit {

  @Output() addAuto = new EventEmitter<AutoCreate | null>();

  newAutoForm: FormGroup;

  newAuto: AutoCreate = {
    autoType: "",
    autoDescription: "",
    autoModel: "",
    color: "",
    year: ""
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.newAutoForm = this.formBuilder.group({
      autoModel: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      autoType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      color: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern("^(19|20)\\d{2}$")
      ]),
      autoDescription: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.newAuto = {autoType: "", autoDescription: "", autoModel: "", color: "", year: ""}
    this.newAutoForm.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.newAutoForm.controls;
  }

  submitNewAuto() {
    this.newAuto = {
      autoModel: this.newAutoForm.value['autoModel'],
      autoType: this.newAutoForm.value['autoType'],
      color: this.newAutoForm.value['color'],
      autoDescription: this.newAutoForm.value['autoDescription'],
      year: this.newAutoForm.value['year']
    }
    this.addAuto.emit(this.newAuto);
  }

  cancelNewAuto() {
    this.addAuto.emit(null);
    this.ngOnInit();
  }
}
