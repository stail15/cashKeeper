package springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springapp.dao.EventDAO;
import springapp.pojo.Event;

import java.util.List;

/**
 * Created by stail on 11.09.2015.
 */
@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventDAO eventDAO;

    @Override
    @Transactional
    public List<Event> allEvents() {
        return eventDAO.getAllEvents();
    }

//    @Override
//    @Transactional
//    public void createEvent(Event event, List<Integer> inActiveUserId) {
//        eventDAO.createEvent(event);
//        int eventId = event.getId();
//        List<InactiveUsers>list = inActiveUserId.stream()
//                                                .map(id->new InactiveUsers(id,eventId))
//                                                .collect(toList());
//        event.setInactiveUsers(list);
//        eventDAO.createEvent(event);
//    }

    @Override
    @Transactional
    public void createEvent(Event event) {

        eventDAO.createEvent(event);

    }

    @Override
    @Transactional
    public void deleteEvent(int event_id) {
        eventDAO.deleteEvent(event_id);
    }

    @Override
    @Transactional
    public void changeEventStatus(int eventId) {
        Event event = eventDAO.getEventById(eventId);
        event.setIsActive(!event.getIsActive());

    }

    @Override
    @Transactional
    public Event getEventById(int eventId) {
        return eventDAO.getEventById(eventId);
    }

    @Override
    @Transactional
    public void deleteFromInactiveUsers(int eventId, int userId) {
        eventDAO.deleteFromInactiveUsers(eventId, userId);
    }
}
