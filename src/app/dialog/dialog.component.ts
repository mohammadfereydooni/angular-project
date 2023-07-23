import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../services/api.service';
import { query } from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  myControl = new FormControl();
  keyword: any;
  titel = [];


  // options: string[] = ['وب', 'عکس', 'اخبار', 'froogle', 'youtube'];
  // cloneOptions: string[] = ['وب', 'عکس', 'اخبار', 'froogle', 'youtube'];
  filteredOptions!: Observable<string[]>;


  filterRegions: { title: string; hl: string; geo: string; type: string }[] =
    [];

  data: string[] = [];

  upbtn:string= 'ثبت'

  hls: 'en' | 'fa' = 'fa';
  geos: 'IR' | 'US' = 'IR';

  projectList!: FormGroup;

  constructor(private formbuilder: FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editdata: any) {
    this.api.getSuggestion('سلام', this.hls, this.geos).subscribe((res) => {
      this.filterRegions = res;
    });

    this.myControl.valueChanges.pipe(debounceTime(500)).subscribe((res) => {
      this.api.getSuggestion(res, this.hls, this.geos).subscribe((res) => {
        this.filterRegions = res;
      });
    });
  }
  ngOnInit(): void {
    this.projectList = this.formbuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      geo: ['', Validators.required],
      language: ['', Validators.required],
      scaleKeyword: [{}, Validators.required],
      scale: ['', Validators.required],
    });

    if(this.editdata){
      this.upbtn = 'به روز رسانی'
      this.projectList.controls['name'].setValue(this.editdata.name);
      this.projectList.controls['description'].setValue(this.editdata.description);
      this.projectList.controls['category'].setValue(this.editdata.category);
      this.projectList.controls['geo'].setValue(this.editdata.geo);
      this.projectList.controls['language'].setValue(this.editdata.language);
      this.projectList.controls['scaleKeyword'].setValue(this.editdata.scaleKeyword);
      this.projectList.controls['scale'].setValue(this.editdata.scale);
    }



    //  this.projectList.get('category')?.valueChanges.subscribe((res: string) => {
    //   if (res && res.trim().length > 0) {
    //     this.options = this.cloneOptions.filter(
    //       (item) =>
    //         item.toLocaleLowerCase().indexOf(res.trim().toLocaleLowerCase()) >=
    //         0
    //     );
    //   } else {
    //     this.options = JSON.parse(JSON.stringify(this.cloneOptions));
    //   }
    // });
  }

  reigester() {
    if (!this.editdata){
    this.filterRegions.forEach((element) => {
      if (element.title === this.myControl.value) {
        this.keyword = element;
      }
    });

    if (this.projectList.valid) {
      this.projectList.value.scaleKeyword = this.keyword;
      console.log(this.projectList.value);
      this.api.postProject(this.projectList.value).subscribe({
        next: (res) => {
          alert('کاربر با موفقیت ثبت شد');
          // location.reload();
          console.log(this.projectList.value);
        },
        error: () => {
          alert('ثبت انجام نشد');
        },
      });
    }

    else {

      alert('لطفا فرم را با دقت پر کنید');
      console.log(this.projectList.value);
    }
  }
  else {
      this.putProject()
    }


  }


  putProject(){
    this.api.putProject(this.projectList.value, this.editdata.id).subscribe({
      next:(res)=>{
        alert("تغییرات اعمال شد !");
        this.projectList.reset();
        location.reload();
      }
    })
  }

}
