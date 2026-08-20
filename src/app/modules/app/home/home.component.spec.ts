import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Component({ selector: 'app-about', template: '' })
class AboutStubComponent {}

@Component({ selector: 'app-skills', template: '' })
class SkillsStubComponent {}

@Component({ selector: 'app-portfolio', template: '' })
class PortfolioStubComponent {}

@Component({ selector: 'app-education', template: '' })
class EducationStubComponent {}

@Component({ selector: 'app-contact', template: '' })
class ContactStubComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        HomeComponent,
        TranslatePipeStub,
        AboutStubComponent,
        SkillsStubComponent,
        PortfolioStubComponent,
        EducationStubComponent,
        ContactStubComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the translated hero copy and shell sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Greeting');
    expect(compiled.textContent).toContain('ViewWork');
    expect(compiled.querySelectorAll('app-about, app-skills, app-portfolio, app-education, app-contact')).toHaveLength(5);
  });

  it('should scroll to a target section when it exists', () => {
    const scrollIntoView = jest.fn();
    const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView
    } as unknown as HTMLElement);

    component.scrollTo('about');

    expect(getElementByIdSpy).toHaveBeenCalledWith('about');
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    getElementByIdSpy.mockRestore();
  });
});
