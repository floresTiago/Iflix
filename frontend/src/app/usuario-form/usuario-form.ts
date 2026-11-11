import { Component, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario';

@Component({
  imports: [ ReactiveFormsModule ],
  selector: 'app-usuario-form',
  styleUrl: './usuario-form.scss',
  templateUrl: './usuario-form.html',
})
export class UsuarioForm {
  id?: number;
  msg = signal<String | null>(null);

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    tipo: new FormControl<'ADMIN' | 'COMUM'>('COMUM', Validators.required)
  });

  constructor(
    private router: ActivatedRoute,
    private servico: UsuarioService
  ) {
    // pega da url o id
    const parametro = router.snapshot.paramMap.get('id');

    // somente existe parametro na edicao
    if (parametro) {
      // busco o usuario pelo id
      this.id = Number(parametro);
      servico.buscaPorId(this.id).subscribe(
        (usu) => {
          this.form.patchValue(usu);
        }
      );
    }
  }

  salvar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // aborta a execucao
      return;
    }

    console.log('DADOS DO FORMULÁRIO:', this.form.value);
    console.log('salvando...');

    const usuario = {
      idUsuario: this.id,
      nome: this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!,
      tipo: this.form.value.tipo!
    };

    this.servico.gravar(usuario).subscribe((u) => {
      this.id = u.idUsuario;
      console.log(u);
      this.msg.set('Usuário salvo com sucesso!');
    });
  }
}