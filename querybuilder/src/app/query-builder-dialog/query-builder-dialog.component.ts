import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { QuerybuilderService } from '../service/querybuilder/querybuilder.service';

@Component({
  selector: 'app-query-builder-dialog',
  templateUrl: './query-builder-dialog.component.html',
  styleUrls: ['./query-builder-dialog.component.scss']
})
export class QueryBuilderDialogComponent implements OnInit {
  contactForm: FormGroup;
  animalControl: FormControl;
  selectFormControl: FormControl;
  selectCondition: FormControl;

  animals: any[] = [
    {name: 'equal', value: '='},
    {name: 'not equal', value: '!='},
    {name: 'greater than', value: '>'},
    {name: 'less than', value: '<'},
    {name: 'greater than or equal', value: '>='},
    {name: 'less than or equal', value: '<='},
    {name: 'in', value: 'in'},
    {name: 'not in', value: 'not in'},
    {name: 'between', value: 'between'},
    {name: 'not between', value: 'not between'},
    {name: 'like', value: 'like'},
    {name: 'not like', value: 'not like'},
    {name: 'is null', value: 'is_null'},
    {name: 'is not null', value: 'is_not_null'}
  ];
  public whereCount: number = 0;
  constructor(public dialogRef: MatDialogRef<QueryBuilderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private queryBuilderService: QuerybuilderService) {
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();

  }
  // Step 1
  createFormControls() {
      this.animalControl = new FormControl('', Validators.required);
      this.selectFormControl = new FormControl('', Validators.required);
      this.queryBuilderService.whereClause.subscribe ( data => {
        this.whereCount = data.where ? data.where.length : 0;
        if (this.whereCount > 0) {
          this.selectCondition = new FormControl('', Validators.required);
        }
      });
  }

  createForm() {
    this.contactForm = new FormGroup({
      animalControl: this.animalControl,
      selectFormControl:  this.selectFormControl
    });
    if (this.whereCount > 0) {
      this.contactForm = new FormGroup({
        animalControl: this.animalControl,
        selectFormControl:  this.selectFormControl,
        selectCondition: this.selectCondition
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
