import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isDefinedValue } from '../../utils/functions';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';

@Directive({
  selector: '[appLoader]',
  standalone: true,
})
export class LoaderDirective implements OnDestroy, OnChanges {
  @Input('appLoader') content?: unknown;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(): void {
    if (!isDefinedValue(this.content)) {
      this.viewContainer.createComponent(PageLoaderComponent);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
