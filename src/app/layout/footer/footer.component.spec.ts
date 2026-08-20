import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { FooterComponent } from './footer.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, TranslatePipeStub]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the translated footer copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain(String(component.currentYear));
    expect(compiled.textContent).toContain('Footer.Copyright');
    expect(compiled.textContent).toContain('Footer.Text');
  });

  it('should scroll to the top when the action button is clicked', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });

    scrollToSpy.mockRestore();
  });
});
