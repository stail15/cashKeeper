package springapp.service;

import springapp.pojo.Event;

import java.util.List;

/**
 * Created by stail on 11.09.2015.
 */
public interface EventService {

    public List<Event> allEvents();

    public Event getEventById(int eventId);

    public void createEvent(Event event);

    public void deleteEvent(int event_id);

    public void changeEventStatus(int eventId);

    public void deleteFromInactiveUsers(int eventId, int userId);

}
