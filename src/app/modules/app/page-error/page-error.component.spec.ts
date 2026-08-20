import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { PageErrorComponent } from './page-error.component';

describe('PageErrorComponent', () => {
  let component: PageErrorComponent;
  let fixture: ComponentFixture<PageErrorComponent>;
  let router: { navigateByUrl: jest.Mock };
  let location: { back: jest.Mock };

  beforeEach(async () => {
    router = { navigateByUrl: jest.fn() };
    location = { back: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [PageErrorComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: Location, useValue: location }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the default error actions', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('404');
    expect(compiled.textContent).toContain('Volver al Inicio');
    expect(compiled.textContent).toContain('Página Anterior');
  });

  it('should delegate navigation actions to router and location services', () => {
    component.goHome();
    component.goBack();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    expect(location.back).toHaveBeenCalled();
  });
});
