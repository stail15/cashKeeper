package springapp.pojo;


import java.util.Date;
import java.util.List;

/**
 * Created by stail on 11.09.2015.
 */
public class Event {
    private int id;
    private String eventName;
    private Date eventDate;
    private long summ;
    private List inactiveUsers;
    private boolean isActive;

    public Event() {
    }

    ;

    public Event(String eventName, Date eventDate, long summ) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.summ = summ;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getEventDate() {
        return eventDate;
    }


    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public long getSumm() {
        return summ;
    }

    public void setSumm(long summ) {
        this.summ = summ;
    }

    public List getInactiveUsers() {
        return inactiveUsers;
    }

    public void setInactiveUsers(List inactiveUsers) {
        this.inactiveUsers = inactiveUsers;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Event event = (Event) o;

        if (summ != event.summ) return false;
        if (!eventName.equals(event.eventName)) return false;
        return eventDate.getTime() == event.eventDate.getTime();

    }

    @Override
    public int hashCode() {
        int result = eventName.hashCode();
        result = 31 * result + (int) eventDate.getTime();
        result = 31 * result + (int) summ;
        return result;
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("{\"id\":").append(id).append(",\"eventName\":\"").append(eventName)
                .append("\",\"eventDate\":\"").append(eventDate)
                .append("\",\"summ\":").append(summ)
                .append(",\"inactiveUsers\":[],")
                .append("\"isActive\":").append(isActive).append("}");

        return str.toString();
    }
}
