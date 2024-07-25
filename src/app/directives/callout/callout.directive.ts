import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appCallout]',
  standalone: true,
})
export class CalloutDirective implements OnInit, OnDestroy {
  @Input('appCallout') message: string = '';
  @Input('appCalloutType') type: 'info' | 'warning' | 'error' = 'info';

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
  }
}
