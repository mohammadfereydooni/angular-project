import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupsComponent } from './dialog-groups.component';

describe('DialogGroupsComponent', () => {
  let component: DialogGroupsComponent;
  let fixture: ComponentFixture<DialogGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
