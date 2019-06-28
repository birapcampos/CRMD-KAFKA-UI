import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroAutenticacaoComponent } from './erro-autenticacao.component';

describe('ErroAutenticacaoComponent', () => {
  let component: ErroAutenticacaoComponent;
  let fixture: ComponentFixture<ErroAutenticacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroAutenticacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroAutenticacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
