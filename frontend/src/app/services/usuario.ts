import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Service()
export class UsuarioService {

    http: HttpClient = inject(HttpClient);
    url = 'http://localhost:8080/usuario';

    listarUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.url);
    }

    gravar(u: Usuario): Observable<Usuario> {
        // se atualiza
        if (u.idUsuario && u.idUsuario > 0) {
            return this.http.put<Usuario>(this.url, u);
        }

        // criacao
        return this.http.post<Usuario>(this.url, u);
    }

    remover(idUsuario: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${idUsuario}`);
    }

    buscaPorId(idUsuario: number): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.url}/${idUsuario}`);
    }
}