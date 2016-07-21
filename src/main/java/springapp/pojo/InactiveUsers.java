package springapp.pojo;

/**
 * Created by stail on 12.10.2015.
 */
public class InactiveUsers {
    private int id;
    private int userId;
    private int eventId;
    private boolean isActive;

    public InactiveUsers() {
    }


    public InactiveUsers(int userId, int eventId) {
        this.userId = userId;
        this.eventId = eventId;
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

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
