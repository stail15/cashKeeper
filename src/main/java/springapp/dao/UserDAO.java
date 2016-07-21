package springapp.dao;

import springapp.pojo.User;

import java.util.List;
import java.util.Map;

/**
 * Created by stail on 25.07.2015.
 */
public interface UserDAO {

    public List<User> getAllUsers();

    public Map<User, Integer> getAllUsersName();

    public User getUserById(int userId);

    public void updateUserPayments(User user);

    public void addUser(User user);

    public void deleteByID(int userId);

    public void deletePayment(int paymentId, int userId);
}
