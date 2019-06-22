import { element } from 'protractor';
import { Directive, ElementRef, Input, HostListener} from '@angular/core';


@Directive({
  selector: '[appAutoFocus]'
})
export class SetFocusDirective {

  @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {

        setTimeout(() => {

            this.el.nativeElement.focus();

        }, 500);

    }

}
