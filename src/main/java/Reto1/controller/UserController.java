
package Reto1.controller;

import java.util.List;

import Reto1.model.User;
import Reto1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAll();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User registrar(@RequestBody User user) {
        return userService.register(user);
    }
    
    @GetMapping("/{email}/{password}")
    public User autenticarUsuario(@PathVariable("email") String email, @PathVariable("password") String password){
        return userService.userAuthentication(email, password);
    }
    
    @GetMapping("/{email}")
    public boolean existeEmail(@PathVariable("email") String email){
        return userService.emailExist(email);
    }

}
