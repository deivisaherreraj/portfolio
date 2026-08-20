import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: jest.Mocked<Pick<TranslateService, 'currentLang' | 'use'>>;

  beforeEach(async () => {
    localStorage.clear();

    translateService = {
      currentLang: 'es',
      use: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [HeaderComponent, TranslatePipeStub],
      providers: [{ provide: TranslateService, useValue: translateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render translated navigation copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Header.LogoAlt');
    expect(compiled.textContent).toContain('Header.NavLinks.Home');
  });

  it('should toggle the theme and persist the next mode', () => {
    const emitSpy = jest.spyOn(component.themeToggled, 'emit');

    component.toggleTheme();

    expect(component.theme).toBe('light');
    expect(component.isDark).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should switch the active language and call the translate service', () => {
    component.toggleLanguage();

    expect(component.language).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });
});
