import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-placeholder-image',
  standalone: true,
  template: `
    <div 
      [style.width]="width + 'px'"
      [style.height]="height + 'px'"
      class="bg-blue-500/10 rounded-full flex items-center justify-center text-gray-400"
    >
      <i class="fas fa-user text-3xl"></i>
    </div>
  `
})
export class PlaceholderImageComponent {
  @Input() width = 200;
  @Input() height = 200;
} 