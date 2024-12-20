import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-life-cycle-hooks',
  standalone: true,
  imports: [],
  templateUrl: './life-cycle-hooks.component.html',
  styleUrl: './life-cycle-hooks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeCycleHooksComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('name') name!: { first: string; last: string };

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('NgOnInit called...');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }
  ngDoCheck(): void {
    console.log('ngDoCheck Called...');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit Called...');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
    // this.changeDetection.detectChanges();
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit Called...');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked Called...');
  }

  showObj() {
    // console.log('name object', this.name);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called...');
  }
}
