import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './modules/components/map/map.component';
import { UdemyPracticeComponent } from './modules/components/udemy-practice/udemy-practice.component';
import { DataSharingComponent } from './modules/components/data-sharing/data-sharing.component';
import { LifeCycleHooksComponent } from './modules/components/life-cycle-hooks/life-cycle-hooks.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MapComponent,
    UdemyPracticeComponent,
    DataSharingComponent,
    LifeCycleHooksComponent,
    FormsModule,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  isLifeComp: boolean = true;
  changeFirstName(): void {
    this.name = { ...this.name, first: 'aniket' };
    // throw new Error('Method not implemented.');
  }
  name = { first: 'sandesh', last: 'shingare' };
  title = 'angular-doc-practice';
  @ViewChild(DataSharingComponent, { static: true })
  dataShareComp?: DataSharingComponent;
  @ViewChild('log', { static: true }) log?: ElementRef;

  @ViewChildren(DataSharingComponent)
  dataSharComps?: QueryList<DataSharingComponent>;
  @ViewChildren('log') logs?: QueryList<ElementRef<HTMLButtonElement>>;
  ngAfterViewInit(): void {
    this.dataSharComps?.forEach((comp) => {});
  }
  logMsg(): void {
    this.dataShareComp?.log();
  }
  getName(event: any) {}
}
