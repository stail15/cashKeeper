package springapp.service;

import springapp.pojo.Event;
import springapp.pojo.User;

import java.util.Map;

/**
 * Created by stail on 04.05.2016.
 */
public interface XMLBuilder {
    public String buildXML(Map<Event, Map<User, Long>> resultTable, String file);
}
