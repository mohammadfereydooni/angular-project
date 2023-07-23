import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { debounceTime } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Title } from '@angular/platform-browser';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-groups',
  templateUrl: './dialog-groups.component.html',
  styleUrls: ['./dialog-groups.component.scss'],
})
export class DialogGroupsComponent implements OnInit {
  // myControl = new FormControl();
  group!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hls: 'en' | 'fa' = 'fa';
  geos: 'IR' | 'US' = 'IR';
  filterRegions: { title: string; hl: string; geo: string; type: string }[] =
    [];
  keyword: any;

  id: any = this.data;


  @ViewChild('keywordInput')
  keywordInput!: ElementRef<HTMLInputElement>;

  // groupNames:{title:string}[]=[];

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private announcer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.myControl.valueChanges.pipe(debounceTime(500)).subscribe((res)=>{
    //   this.api.getSuggestion(res,this.hls,this.geos).subscribe((res)=>{
    //     this.filterRegions = res;
    //   })
    // })
  }

  ngOnInit(): void {
    this.api.getSuggestion(' ', this.hls, this.geos).subscribe((res) => {
      this.filterRegions = res;
    });
    this.group = this.formbuilder.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      keywords: ['', Validators.required],
    });

  }

  reigesterGroup() {
    var scaleKeyword: any = [];
    this.filterRegions.forEach((keyword) => {
      if (keyword.title === this.group.value.keywords) {
        scaleKeyword.push(keyword);
      }
    });
    if (this.group.valid) {
      this.group.value.keywords = scaleKeyword;
      console.log(this.group.value);
      this.api.postGroup(this.group.value, this.id.datakey.id).subscribe({
        next: (res) => {
          alert('گروه ثبت شد');
        },
      });
    } else {
      alert('erroorrr');
      console.log(this.group.value);
    }
  }

  // remove(groupName: []): void {
  //   const index = this.groupNames.indexOf();

  //   if (index >= 0) {
  //     this.groupNames.splice(index, 1);

  //     this.announcer.announce(`Removed ${groupName}`);
  //   }
  // }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.keyword.push(event.option.viewValue);
    // this.keywordInput.nativeElement.value = '';
    this.group.controls['keywords'].setValue(this.keyword);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keyword.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    // this.group.setValue(null);
  }

  searchInSuggest() {
    this.api
      .getSuggestion(this.group.value.keywords, this.hls, this.geos)
      .subscribe((res) => {
        this.filterRegions = res;
      });
  }
}
