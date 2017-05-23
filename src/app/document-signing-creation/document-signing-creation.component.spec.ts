import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSigningCreationComponent } from './document-signing-creation.component';

describe('DocumentSigningCreationComponent', () => {
  let component: DocumentSigningCreationComponent;
  let fixture: ComponentFixture<DocumentSigningCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSigningCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSigningCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
