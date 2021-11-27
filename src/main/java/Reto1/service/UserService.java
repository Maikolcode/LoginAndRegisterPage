package Reto1.service;

import java.util.List;
import java.util.Optional;

import Reto1.model.User;
import Reto1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public Optional<User> getUser(int id) {
        return userRepository.getUser(id);
    }
    
    public User register(User user) {
        if (user.getId() == null){
            if (emailExist(user.getEmail()) == false) {
                return userRepository.save(user);
            }else {
                return user;
            }
        }else {
            return user;
        }
    }
    public boolean emailExist(String email) {
        return userRepository.emailExist(email);
    }
    
    public User userAuthentication(String email, String password) {
        Optional<User> user = userRepository.userAuthentication(email, password);
        
        if (user.isEmpty()) {
            return new User(email, password, "NO DEFINIDO");
        }else {
            return user.get();
        }
        
    }
    
}
