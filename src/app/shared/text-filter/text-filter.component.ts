import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-text-filter',
  template: `
    <form [formGroup]="searchForm">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="{{ 'TEXT_FILTER.PLACEHOLDER' | translate }}"
               formControlName="textFilter">
        <span class="input-group-text addon" (click)="resetTextFilter()">
          <span class="fas fa-search" [hidden]="isTextFilterNotEmpty"></span>
          <span class="fas fa-times" [hidden]="!isTextFilterNotEmpty"></span>
        </span>
      </div>
    </form>`,
  styles: [`
    .addon {
      color: var(--accent-color);
    }
  `],
})
export class TextFilterComponent implements OnInit, OnDestroy {
  @Output() valueDidChange: EventEmitter<string>;

  searchForm: FormGroup;
  protected searchControl: FormControl;

  protected searchControlSubscription: Subscription;

  constructor(protected formBuilder: FormBuilder,
              protected logger: NGXLogger) {
    this.valueDidChange = new EventEmitter<string>();
  }

  get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      textFilter: this.searchControl = new FormControl(''),
    });

    this.subscribeToSearchControlValueChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeToSearchControlValueChanges();
  }

  resetTextFilter(): void {
    this.searchControl.setValue('');
  }

  protected subscribeToSearchControlValueChanges(): void {
    this.unsubscribeToSearchControlValueChanges();

    this.searchControlSubscription = this.searchControl
      .valueChanges
      .pipe(debounceTime(1000))
      .subscribe({
        next: value => this.valueDidChange.emit(value),
        error: e => this.logger.error(e.toString()),
      });
  }

  protected unsubscribeToSearchControlValueChanges(): void {
    this.searchControlSubscription?.unsubscribe();
  }
}
