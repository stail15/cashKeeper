package springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springapp.dao.UserDAO;
import springapp.pojo.User;
import springapp.pojo.UserPayments;

import java.util.List;
import java.util.Map;

/**
 * Created by stail on 25.07.2015.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public List<User> allUsers() {
        List<User> allUsers = userDAO.getAllUsers();
        return allUsers;
    }


    @Override
    @Transactional
    public Map<User, Integer> allUsersName() {
        Map<User, Integer> allUsers = userDAO.getAllUsersName();
        return allUsers;
    }

    @Override
    @Transactional
    public void addUser(User user) {
        userDAO.addUser(user);
    }

    @Override
    @Transactional
    public void deleteUser(int userId) {
        userDAO.deleteByID(userId);
    }

    @Override
    @Transactional
    public void changeUserStatus(int userId) {
        User user = userDAO.getUserById(userId);
        user.setIsActive(!user.getIsActive());

    }

    @Override
    @Transactional
    public User getUserById(int userId) {
        return userDAO.getUserById(userId);
    }

    @Override
    @Transactional
    public void updateUser(int userId, UserPayments userPayment) {
        User user = userDAO.getUserById(userId);
        user.getUserPayments().add(userPayment);
        userDAO.updateUserPayments(user);
    }

    @Override
    @Transactional
    public List<UserPayments> allUserPayments(int userId) {
        User user = userDAO.getUserById(userId);

        return user.getUserPayments();

    }

    @Override
    @Transactional
    public void deletePayment(int paymentId, int userId) {
        userDAO.deletePayment(paymentId, userId);
    }


}
