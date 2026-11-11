package br.edu.ifar.iflix.controller;

import br.edu.ifar.iflix.model.Usuario;
import br.edu.ifar.iflix.service.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping( "/usuario")
public class UsuarioController {

    private UsuarioService service;

    public UsuarioController( UsuarioService s ) {
        this.service = s;
    }
    @GetMapping("/{id}")
    public Usuario buscaPorId( @PathVariable int id ){
        return this.service.buscaPorId(id);
    }

    @GetMapping
    public List<Usuario> buscarTodos(){
        return this.service.buscarTodos();
    }
    @PostMapping
    public Usuario gravar( @RequestBody Usuario u){
        this.service.gravar(u);
        return u;

    }
    @PutMapping
    public Usuario atualizar( @RequestBody Usuario u){
        this.service.gravar(u);
        return u;

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable int id) {
        this.service.excluir(id);
    }

}

