import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appInViewOnce]',
    standalone: true,
})
export class InViewOnceDirective implements OnInit, OnDestroy {
    @Output() inViewOnce = new EventEmitter<void>();
    private observer?: IntersectionObserver;
    private triggered = false;

    constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) { }

    ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!this.triggered && e.isIntersecting) {
                            this.triggered = true;
                            this.zone.run(() => this.inViewOnce.emit());
                            this.observer?.disconnect();
                        }
                    });
                },
                { threshold: 0.15 }
            );
            this.observer.observe(this.el.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
