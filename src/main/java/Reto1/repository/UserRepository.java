package Reto1.repository;

import java.util.List;
import java.util.Optional;

import Reto1.model.User;
import Reto1.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepository {

    @Autowired
    private UserCrudRepository userCrudRepository;

    public List <User> getAll(){
      return (List<User>) userCrudRepository.findAll();
    }
    
    public Optional<User> getUser(int id){
        return userCrudRepository.findById(id);
    }
    
    public User save(User user) {
        return userCrudRepository.save(user);
    }
    
    public boolean emailExist(String email) {
        Optional<User> user = userCrudRepository.findByEmail(email);
        return !user.isEmpty();
    }
    
    public Optional<User> userAuthentication(String email, String password) {
        return userCrudRepository.findByEmailAndPassword(email, password);
    }
    
}
