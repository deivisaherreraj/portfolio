import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectComponent } from './project.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [ProjectComponent, TranslatePipeStub]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render translated project list copy', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(compiled.textContent).toContain('FeaturedProjects.AllProjects');
    expect(compiled.textContent).toContain('FeaturedProjects.ViewDetails');
  });

  it('should filter the rendered projects when a category is selected', () => {
    component.setActiveFilter('Frontend');
    fixture.detectChanges();

    expect(component.filteredProjects().length).toBeGreaterThan(0);
    expect(component.filteredProjects().length).toBeLessThanOrEqual(component.projects.length);
  });
});
