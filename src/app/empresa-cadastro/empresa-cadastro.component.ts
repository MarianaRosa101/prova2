import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent {
    empresaForm: FormGroup;
    empresas: any[] = [];
  
    constructor(private formBuilder: FormBuilder) {
      this.empresaForm = this.formBuilder.group({
        nome: ['', Validators.required],
        cnpj: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', Validators.required]
      });
    }
  
    cadastrar() {
      if (this.empresaForm.valid) {
        const novaEmpresa = {
          id: this.empresas.length + 1,
          nome: this.empresaForm.value.nome,
          cnpj: this.empresaForm.value.cnpj,
          email: this.empresaForm.value.email,
          telefone: this.empresaForm.value.telefone
        };
        this.empresas.push(novaEmpresa);
        this.empresaForm.reset();
      }
    }
  
    remover(id: number) {
      this.empresas = this.empresas.filter(empresa => empresa.id !== id);
    }
  }
  
