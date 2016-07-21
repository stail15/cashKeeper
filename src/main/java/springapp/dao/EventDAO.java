package springapp.dao;

import springapp.pojo.Event;

import java.util.List;


/**
 * Created by stail on 11.09.2015.
 */
public interface EventDAO {
    public List<Event> getAllEvents();

    public void createEvent(Event event);

    public void deleteEvent(int event_id);

    public Event getEventById(int event_id);

    public void deleteFromInactiveUsers(int eventId, int userId);
}
