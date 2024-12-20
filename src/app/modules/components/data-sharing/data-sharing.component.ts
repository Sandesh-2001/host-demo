import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-sharing',
  standalone: true,
  imports: [],
  templateUrl: './data-sharing.component.html',
  styleUrl: './data-sharing.component.css',
})
export class DataSharingComponent {
  @Input('name') name!: string;
  @Output('name') outputName: EventEmitter<any> = new EventEmitter();

  outputNameFun(event: any) {
    console.log('event');
    this.outputName.emit(event.target.value);
  }
  log() {
    console.log('from parent comp click');
  }
}
