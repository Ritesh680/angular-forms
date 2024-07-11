import { Component, Input } from '@angular/core';
import { LoaderVariantProps, loaderClass } from './loaderCVA.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinning-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinning-loader.component.html',
  styleUrl: './spinning-loader.component.css',
})
export class SpinningLoaderComponent {
  @Input() size: LoaderVariantProps['size'];
  get computedClasses(): string {
    return loaderClass({
      size: this.size,
    });
  }
}
