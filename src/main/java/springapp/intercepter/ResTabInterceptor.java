package springapp.intercepter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import springapp.pojo.Event;
import springapp.pojo.User;
import springapp.service.EventService;
import springapp.service.ResultTable;
import springapp.service.ResultTableImpl;
import springapp.service.UserService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by stail on 04.05.2016.
 */
public class ResTabInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        List<Event> eventList = eventService.allEvents();
        List<User> userList = userService.allUsers();
        ResultTable resultTable = new ResultTableImpl(eventList, userList);
        ServletContext context = request.getSession().getServletContext();
        String pathToFile = context.getRealPath("/WEB-INF/resources/xml/resultTable.xml");
        resultTable.createReusltTable(pathToFile);

        System.out.println("Pre-handle");

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        //System.out.println("Post-handle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {


        //System.out.println("After completion handle");
    }
}
