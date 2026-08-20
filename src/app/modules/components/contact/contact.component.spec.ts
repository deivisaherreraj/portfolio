import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';

import { ContactComponent } from './contact.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let translateService: jest.Mocked<Pick<TranslateService, 'instant'>>;

  beforeEach(async () => {
    jest.useFakeTimers();

    translateService = {
      instant: jest.fn((key: string | string[]) => key)
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule],
      declarations: [ContactComponent, TranslatePipeStub],
      providers: [{ provide: TranslateService, useValue: translateService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should create and render translated contact copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Contact.Title');
    expect(compiled.textContent).toContain('Contact.Labels.Send');
  });

  it('should reset the form and clear the success message after submit completes', () => {
    const form = { resetForm: jest.fn() } as unknown as NgForm;

    component.formData = {
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hello',
      message: 'Testing contact flow'
    };

    component.handleSubmit(form);
    expect(component.isSubmitting).toBe(true);

    jest.advanceTimersByTime(1500);

    expect(component.isSubmitting).toBe(false);
    expect(component.submitMessage).toBe('Contact.SuccessMessage');
    expect(translateService.instant).toHaveBeenCalledWith('Contact.SuccessMessage');
    expect(form.resetForm).toHaveBeenCalled();
    expect(component.formData).toEqual({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    jest.advanceTimersByTime(5000);

    expect(component.submitMessage).toBe('');
  });
});
