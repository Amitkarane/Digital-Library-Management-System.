package com.vizionexl.LMS.Controller;

import com.vizionexl.LMS.Model.UserData;
import com.vizionexl.LMS.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userservice;

    @GetMapping("/GetAllUsers")
    public List<UserData> GetUsers(){
        return userservice.GetAllUser();
    }

    @PostMapping("/SaveUser")
    public UserData SaveUser(@RequestBody UserData user){
        return userservice.SaveUser(user);
    }

    @DeleteMapping("/{id}/delete")
    public String DeleteUser(@PathVariable("id") Long UserId){
        return userservice.DeleteUser(UserId);
    }

}
