import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-text-head',
  standalone: true,
  imports: [],
  templateUrl: './display-text-head.component.html',
  styleUrl: './display-text-head.component.scss',
})
export class DisplayTextHeadComponent {
  @Input() textInput: string = '';
}
