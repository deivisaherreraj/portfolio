import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { projects } from '@appcore/data/projects';

import { ProjectDetailComponent } from './project-detail.component';

@Pipe({ name: 'translate' })
class TranslatePipeStub implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let router: Router;
  let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    paramMap$ = new BehaviorSubject(convertToParamMap({ id: String(projects[0].id) }));

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [ProjectDetailComponent, TranslatePipeStub],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMap$.asObservable() }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the matching project from the route id', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component).toBeTruthy();
    expect(component.project?.id).toBe(projects[0].id);
    expect(compiled.textContent).toContain(projects[0].title);
  });

  it('should redirect to the error page when the route id is missing from the data set', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    paramMap$.next(convertToParamMap({ id: '999999' }));
    fixture.detectChanges();

    expect(component.project).toBeUndefined();
    expect(navigateSpy).toHaveBeenCalledWith(['/page-error']);
  });
});
