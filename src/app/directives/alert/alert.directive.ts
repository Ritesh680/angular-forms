import {
  Directive,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs';

@Directive({
  selector: '[appAlert]',
  standalone: true,
})
export class AlertDirective implements OnChanges {
  @Input('appAlert') alert: boolean = false;
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
    private ngZone: NgZone
  ) {}

  private scrollToView(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alert'].currentValue) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: 'This is an alert message',
      });
      this.ngZone.onStable.pipe(take(1)).subscribe(() => {
        this.scrollToView();
      });

      setTimeout(() => {
        this.viewContainer.clear();
      }, 5000);
    } else {
      this.viewContainer.clear();
    }
  }
}
