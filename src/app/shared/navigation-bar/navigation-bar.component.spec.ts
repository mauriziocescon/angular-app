import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule } from "ng2-translate";

import { NavigationBarComponent } from "./navigation-bar.component";

describe("NavigationBarComponent", () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        TranslateModule,
      ],
      declarations: [
        NavigationBarComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
