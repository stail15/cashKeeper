package springapp.dao;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import springapp.pojo.Event;
import springapp.pojo.InactiveUsers;

import java.util.List;

/**
 * Created by stail on 11.09.2015.
 */
@Repository
public class EventDAOImpl implements EventDAO {

    @Autowired
    SessionFactory sessionFactory;

    @Override
    public List<Event> getAllEvents() {
        return sessionFactory.getCurrentSession().createCriteria(Event.class).addOrder(Order.desc("eventDate")).list();
    }

    @Override
    public void createEvent(Event event) {
        sessionFactory.getCurrentSession().save(event);
    }

    @Override
    public void deleteEvent(int event_id) {
        Event event = (Event) sessionFactory.getCurrentSession().get(Event.class, event_id);
        sessionFactory.getCurrentSession().delete(event);
    }

    @Override
    public Event getEventById(int event_id) {

        return (Event) sessionFactory.getCurrentSession().get(Event.class, event_id);
    }

    @Override
    public void deleteFromInactiveUsers(int eventId, int userId) {
        //String queryString = "DELETE FROM activeuserforevent WHERE userId="+userId+" and eventId="+eventId;
        String queryString2 = "SELECT * FROM activeuserforevent WHERE userId=" + userId + " and eventId=" + eventId;
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(queryString2).addEntity(InactiveUsers.class);

        InactiveUsers inactiveUser = (InactiveUsers) query.list().get(0);

        Event event = (Event) sessionFactory.getCurrentSession().get(Event.class, eventId);

        event.getInactiveUsers().remove(inactiveUser);
        sessionFactory.getCurrentSession().delete(inactiveUser);

    }
}
