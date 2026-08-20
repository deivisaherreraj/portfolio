import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent {}

describe('AppComponent', () => {
  let translateServiceStub: Pick<TranslateService, 'addLangs' | 'setDefaultLang' | 'use' | 'get'> & {
    currentLang: string;
  };
  let titleServiceSpy: Pick<Title, 'setTitle'>;
  let localStorageGetItemSpy: jest.SpyInstance<string | null, [key: string]>;

  beforeEach(async () => {
    translateServiceStub = {
      addLangs: jest.fn(),
      setDefaultLang: jest.fn(),
      use: jest.fn(),
      get: jest.fn(() => of('Portfolio')),
      currentLang: 'es'
    };

    titleServiceSpy = {
      setTitle: jest.fn()
    };

    localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'theme') {
        return 'dark';
      }

      return null;
    });

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderStubComponent,
        FooterStubComponent
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: Title, useValue: titleServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  afterEach(() => {
    localStorageGetItemSpy.mockRestore();
    document.documentElement.classList.remove('dark');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app shell structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-header')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should initialize translation and title services for the shell', () => {
    TestBed.createComponent(AppComponent);

    expect(translateServiceStub.addLangs).toHaveBeenCalledWith(['es', 'en']);
    expect(translateServiceStub.setDefaultLang).toHaveBeenCalledWith('es');
    expect(translateServiceStub.use).toHaveBeenCalledWith('es');
    expect(translateServiceStub.get).toHaveBeenCalledWith('TextosAplicacion.PageTitle');
    expect(titleServiceSpy.setTitle).toHaveBeenCalledWith('Portfolio');
  });

  it('should prefer the stored language when initializing the shell', () => {
    localStorageGetItemSpy.mockImplementation((key: string) => {
      if (key === 'lang') {
        return 'en';
      }

      if (key === 'theme') {
        return 'dark';
      }

      return null;
    });

    TestBed.createComponent(AppComponent);

    expect(translateServiceStub.use).toHaveBeenCalledWith('en');
  });
});
