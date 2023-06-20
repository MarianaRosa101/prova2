import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../empresa.model';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.css']
})
export class EmpresaCadastroComponent {
  empresaForm: FormGroup;
  empresas: Empresa[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {
    this.empresaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  cadastrar() {
    if (this.empresaForm.valid) {
      const novaEmpresa: Empresa = {
        nome: this.empresaForm.value.nome,
        cnpj: this.empresaForm.value.cnpj,
        email: this.empresaForm.value.email,
        telefone: this.empresaForm.value.telefone,
        id: 0
      };

      this.empresaService.cadastrarEmpresa(novaEmpresa).subscribe(() => {
        this.empresaForm.reset();
        this.atualizarListaEmpresas();
      });
    }
  }

  remover(id: number) {
    this.empresaService.removerEmpresa(id).subscribe(() => {
      this.empresas = this.empresas.filter(empresa => empresa.id !== id);
    });
  }

  private atualizarListaEmpresas() {
    this.empresaService.getEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }
}
