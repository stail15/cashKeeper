package springapp.dao;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import springapp.pojo.User;
import springapp.pojo.UserPayments;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

/**
 * Created by stail on 25.07.2015.
 */
@Repository
public class UserDAOImpl implements UserDAO {
    @Autowired
    SessionFactory sessionFactory;

    @Override
    public List<User> getAllUsers() {
        List<User> allUsers = sessionFactory.getCurrentSession().createCriteria(User.class).addOrder(Order.asc("name")).list();
        return allUsers;
    }

    @Override
    public Map<User, Integer> getAllUsersName() {

        SQLQuery query = sessionFactory.getCurrentSession()
                .createSQLQuery("SELECT U.user_id, U.username, U.isActive, IFNULL(sum(P.userSum),0) " +
                        "FROM users AS U LEFT JOIN payment AS P ON P.userId=U.user_id GROUP by U.username");


        List<Object[]> objects = query.list();
        Map<User, Integer> allUsersName = objects.stream()
                .collect(toMap(user -> parseToUser(user),
                        sum -> Integer.parseInt(String.valueOf(sum[3]))));

        return allUsersName;
    }

    public static User parseToUser(Object[] obj) {
        int id = Integer.parseInt(String.valueOf(obj[0]));
        String name = String.valueOf(obj[1]);
        boolean isActive = Boolean.parseBoolean(String.valueOf(obj[2]));
        User user = new User(id, name, isActive);

        return user;
    }

    @Override
    public User getUserById(int userId) {
        return (User) sessionFactory.getCurrentSession().get(User.class, userId);
    }

    @Override
    public void addUser(User user) {
        sessionFactory.getCurrentSession().saveOrUpdate(user);
    }

    @Override
    public void deleteByID(int userId) {
        User user = getUserById(userId);
        sessionFactory.getCurrentSession().delete(user);
    }

    @Override
    public void updateUserPayments(User user) {
        sessionFactory.getCurrentSession().saveOrUpdate(user);
    }

    @Override
    public void deletePayment(int paymentId, int userId) {
        User user = (User) sessionFactory.getCurrentSession().get(User.class, userId);
        UserPayments userPayments = (UserPayments) sessionFactory.getCurrentSession().get(UserPayments.class, paymentId);
        user.getUserPayments().remove(userPayments);
        sessionFactory.getCurrentSession().delete(userPayments);
    }
}
