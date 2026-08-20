import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InViewOnceDirective } from '@appcore/pipe/in-view-once.directive';

import { SkillsComponent } from './skills.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, InViewOnceDirective],
      declarations: [SkillsComponent, TranslatePipeStub]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render translated skills copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('Skills.Title');
    expect(compiled.textContent).toContain('Skills.Description');
  });

  it('should mark a skills card as in view once the callback is triggered', () => {
    component.markInView('Frontend');

    expect(component.inViewStates().Frontend).toBe(true);
  });
});
