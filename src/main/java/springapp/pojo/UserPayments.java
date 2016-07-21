package springapp.pojo;

import java.util.Date;

/**
 * Created by stail on 20.09.2015.
 */
public class UserPayments {
    private int id;
    private Date date;
    private Long summ;
    private int userId;

    public UserPayments() {
    }

    public UserPayments(int userId, Date date, Long summ) {
        this.date = date;
        this.summ = summ;
        this.userId = userId;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getSumm() {
        return summ;
    }

    public void setSumm(Long summ) {
        this.summ = summ;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserPayments that = (UserPayments) o;

        return id == that.id;

    }

    @Override
    public int hashCode() {
        return id;
    }
}
