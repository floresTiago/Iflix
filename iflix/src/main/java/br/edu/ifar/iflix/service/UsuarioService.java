package br.edu.ifar.iflix.service;

import br.edu.ifar.iflix.model.Usuario;
import br.edu.ifar.iflix.repository.UsuarioRepository;
import jakarta.persistence.OrderBy;
import jakarta.transaction.Transactional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.beans.Transient;
import java.util.List;
@Service
public class UsuarioService {

    private UsuarioRepository repo;

    public UsuarioService(UsuarioRepository r){
        this.repo = r;
    }

    public List<Usuario> buscarTodos(){
        return this.repo.findAll(Sort.by(Order.asc("nome"))  );
    }

    public void gravar(Usuario u){
        this.repo.save(u);
    }

    public Usuario buscaPorId(int id){
        return this.repo.findById(id)
                .orElseThrow( () ->  new  ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Usuario não encontrada"
                ) ) ;
    }

    public void excluir(int id) {
        Usuario u = buscaPorId(id);
        this.repo.delete(u);
    }
}
