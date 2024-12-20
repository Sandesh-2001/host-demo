import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  filter,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  Observable,
  of,
} from 'rxjs';

interface UserInterface {
  name: string;
  id: string;
  age: number;
  isActive: boolean;
}

type UserNames = string;
@Component({
  selector: 'app-udemy-practice',
  standalone: true,
  imports: [],
  templateUrl: './udemy-practice.component.html',
  styleUrl: './udemy-practice.component.css',
})
export class UdemyPracticeComponent {
  items$ = of(['item1', 'item2', 'item3']);
  selectedItems$ = of('item2', 'item1');
  @ViewChild('input') inputRef!: ElementRef;
  ngOnInit() {
    combineLatest([this.items$, this.selectedItems$])
      .pipe(
        map(([items, selected]) => {
          // console.log('data', items, 'is selected==============', selected);
          return items.map((item) => {
            return { item: item, isSelected: item === selected };
          });
        })
      )
      .subscribe(console.log);
    of('input delay')
      .pipe(delay(1000))
      .subscribe(() => {
        this.comb();
      });
  }

  comb() {
    // console.log('input is==>', this.inputRef);
    // const times$ = interval(5000);
    // const inputObs$ = fromEvent(document.querySelector('input')!, 'input').pipe(
    //   map((event: any) => event.target.value)
    // );

    // combineLatest([times$, inputObs$]).subscribe(([time, inputVal]) => {
    //   console.log(`After ${time} seconds op ${inputVal}`);
    // });

    const state$ = new BehaviorSubject<{ user: string | null }>({ user: null });

    // Component 1: Subscribe to the state
    state$.subscribe((state) => console.log('Component 1 State:', state));

    // Update the state
    state$.next({ user: 'Sandesh' });
    // Output: Component 1 State: { user: 'Sandesh' }

    // Component 2: New subscription
    state$.subscribe((state) => console.log('Component 2 State:', state));
    // Output: Component 2 State: { user: 'Sandesh' }
  }
}
