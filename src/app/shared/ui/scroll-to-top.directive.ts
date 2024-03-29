import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollToTop]',
  standalone: true,
})
export class ScrollToTopDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  constructor() {
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    const scrollTopHeight = this.document.documentElement.scrollTop || 0;
    if (scrollTopHeight > 100) {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }
  }

  @HostListener('click', ['$event'])
  scrollToTop(event: any): void {
    this.document.documentElement.scrollTop = 0;
  }
}
