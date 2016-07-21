package springapp.pojo;

import java.util.List;


/**
 * Created by stail on 25.07.2015.
 */
//@Entity
//@Table(name="users")
public class User {

    private int id;
    private String name;
    private String password;
    private String email;
    private List userPayments;
    private boolean isActive;

    public User(int id, String name, boolean isActive) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }

    public User() {
    }

    ;

    public User(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    public List getUserPayments() {
        return userPayments;
    }

    public void setUserPayments(List userPayments) {
        this.userPayments = userPayments;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ",isActive=" + isActive +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' + ", payments='" + userPayments + '\'' +
                '}';
    }
}
