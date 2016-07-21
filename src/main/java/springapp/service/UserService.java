package springapp.service;

import springapp.pojo.User;
import springapp.pojo.UserPayments;

import java.util.List;
import java.util.Map;

/**
 * Created by stail on 25.07.2015.
 */
public interface UserService {

    public List<User> allUsers();

    public Map<User, Integer> allUsersName();

    public User getUserById(int userId);

    public void addUser(User user);

    public void updateUser(int userId, UserPayments userPayment);

    public void deleteUser(int userId);

    public void changeUserStatus(int userId);

    public List<UserPayments> allUserPayments(int userId);

    public void deletePayment(int paymentId, int userId);
}
