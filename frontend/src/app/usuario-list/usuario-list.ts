import { Component, inject, Inject, signal } from '@angular/core';
import { UsuarioService } from '../services/usuario';
import { Usuario } from '../models/usuario';

@Component({
  imports: [],
  selector: 'app-usuario-list',
  styleUrl: './usuario-list.scss',
  templateUrl: './usuario-list.html',
})
export class UsuarioList {
  // arquivo que controla o html
  usuarios = signal<Usuario[]>([]);

  constructor(private servico: UsuarioService) {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.servico.listarUsuarios().subscribe((lista) => {
      this.usuarios.set(lista);
    });
  }

  excluir(id: number) {
    this.servico.remover(id).subscribe(() => {
        this.carregarUsuarios();
    });
}
}