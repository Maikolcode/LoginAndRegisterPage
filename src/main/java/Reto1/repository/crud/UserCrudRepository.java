
package Reto1.repository.crud;

import java.util.Optional;

import Reto1.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserCrudRepository  extends CrudRepository <User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);
}
