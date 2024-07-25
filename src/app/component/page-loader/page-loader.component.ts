import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  LoaderVariantProps,
  loaderClass,
} from '@components/spinning-loader/loaderCVA.config';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.css',
})
export class PageLoaderComponent {
  @Input() size: LoaderVariantProps['size'];
  get computedClasses(): string {
    return loaderClass({
      size: this.size,
      intent: 'primary',
    });
  }
}
