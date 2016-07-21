package springapp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import springapp.pojo.Event;
import springapp.pojo.InactiveUsers;
import springapp.pojo.User;
import springapp.pojo.UserPayments;
import springapp.service.EventService;
import springapp.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;


@Controller
public class SpringController {

    @Autowired
    UserService userService;

    @Autowired
    EventService eventService;


    //Test Page
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String testList() {
        return "test";
    }


    // ------------------------------------------------------------------------

    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getAllUsers(HttpServletRequest request) {
        List<User> allUsers = userService.allUsers();
        allUsers.forEach(user -> user.setUserPayments(Collections.emptyList()));

        allUsers.forEach(System.out::println);

        List<Event> eventList = eventService.allEvents();


        return allUsers;
    }

    @RequestMapping(value = "/userGrid", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String userManagment(@RequestParam(value = "id") Integer userId,
                                @RequestParam(value = "name") String name,
                                @RequestParam(value = "password") String password,
                                @RequestParam(value = "email") String email,
                                @RequestParam(value = "isActive", defaultValue = "false") Boolean isActive,
                                @RequestParam(value = "!nativeeditor_status") String status

    ) {
        if (status.equals("updated")) {
            User user = userService.getUserById(userId);
            user.setName(name);
            user.setPassword(password);
            user.setEmail(email);
            user.setIsActive(isActive);
            userService.addUser(user);

            System.out.println("User was updated: " + user.getId() + " " + userId);
        } else {
            if (status.equals("deleted")) {
                userService.deleteUser(userId);
            }
        }


        return status;

    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    @ResponseBody
    public String addNewUser(@RequestParam(value = "id", required = false) String userId,
                             @RequestParam(value = "name") String name,
                             @RequestParam(value = "password") String password,
                             @RequestParam(value = "email") String email
    ) {
        User user = new User(name, password, email);
        user.setIsActive(true);
        userService.addUser(user);
        System.out.println("New user ID is: " + user.getId());
        return "Inserted";
    }

    @RequestMapping(value = "/getUsers/{status}/{eventId}", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsersForEvent(@PathVariable Integer eventId,
                                       @PathVariable Boolean status) {


        List<User> allUsers = userService.allUsers();
        List<InactiveUsers> allActiveUsers = eventService.getEventById(eventId).getInactiveUsers();
        Predicate<User> ifUserIsNotInActiveList = user -> allActiveUsers.stream()
                .noneMatch(x -> x.getUserId() == user.getId());
        Predicate<User> ifUserIsInActiveList = user -> allActiveUsers.stream()
                .anyMatch(x -> x.getUserId() == user.getId());

        if (status) {
            allUsers = allUsers.stream()
                    .filter(ifUserIsInActiveList)
                    .collect(toList());
        } else {
            allUsers = allUsers.stream()
                    .filter(x -> x.getIsActive())
                    .filter(ifUserIsNotInActiveList)
                    .collect(toList());

        }

        allUsers.forEach(x -> x.setUserPayments(Collections.emptyList()));
        allUsers.forEach(x -> x.setPassword(""));
        allUsers.forEach(x -> x.setEmail(""));


        return allUsers;
    }

    @RequestMapping(value = "/userForEvent/{eventId}/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public String userForEvent(@PathVariable Integer eventId,
                               @PathVariable Integer userId) {

        Event event = eventService.getEventById(eventId);
        List<InactiveUsers> allActiveUsers = event.getInactiveUsers();
        boolean status = allActiveUsers.stream()
                .anyMatch(x -> x.getUserId() == userId);

        if (status) {
            eventService.deleteFromInactiveUsers(eventId, userId);

        } else {
            allActiveUsers.add(new InactiveUsers(userId, eventId));
            event.setInactiveUsers(allActiveUsers);
            eventService.createEvent(event);
        }


        return "updated";
    }

    @RequestMapping(value = "/getAllPayments", method = RequestMethod.GET)
    @ResponseBody
    public List<UserPayments> getAllUserPayments(@RequestParam(value = "userId") int userId) {
        return userService.allUserPayments(userId);
    }


    @RequestMapping(value = "/paymentGrid", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String userPaymentManagment(@RequestParam(value = "id") Integer id,
                                       @RequestParam(value = "date", required = false) String date,
                                       @RequestParam(value = "summ", required = false) String summ,
                                       @RequestParam(value = "userId") Integer userId,
                                       @RequestParam(value = "!nativeeditor_status") String status) {
        if (status.equals("deleted")) {
            userService.deletePayment(id, userId);
        }
        return status;
    }

    @RequestMapping(value = "/addPayment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String addNewPayment(@RequestParam(value = "summ") long summ,
                                @RequestParam(value = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date paymentDate,
                                @RequestParam(value = "userId") int userId) {

        UserPayments userPayment = new UserPayments(userId, paymentDate, summ);
        userService.updateUser(userId, userPayment);
        return "Inserted";
    }

    @RequestMapping(value = "/getAllEvents", method = RequestMethod.GET)
    @ResponseBody
    public String getAllEvents() {
        List<Event> eventList = eventService.allEvents();

        //eventList.forEach(event -> event.setInactiveUsers(Collections.emptyList()));

        String response = eventList.stream()
                .map(Event::toString)
                .reduce("[", (akkum, str) -> akkum + str) + "]";
        response = response.replace("}{", "},{");

        return response;
    }

    @RequestMapping(value = "/eventGrid", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String eventManagment(@RequestParam(value = "id") Integer eventId,
                                 @RequestParam(value = "eventName") String eventName,
                                 @RequestParam(value = "eventDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date eventDate,
                                 @RequestParam(value = "summ") long summ,
                                 @RequestParam(value = "isActive", defaultValue = "false") Boolean isActive,
                                 @RequestParam(value = "!nativeeditor_status") String status
    ) {

        if (status.equals("updated")) {
            Event event = eventService.getEventById(eventId);
            event.setEventName(eventName);
            event.setEventDate(eventDate);
            event.setSumm(summ);
            event.setIsActive(isActive);
            eventService.createEvent(event);
            int id = event.getId();
            System.out.println("Event was updated: " + id + " " + eventId);
        } else {
            if (status.equals("deleted")) {
                eventService.deleteEvent(eventId);
            }
        }

        return status;
    }

    @RequestMapping(value = "/addEvent", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String addNewEvent(@RequestParam(value = "eventName") String eventName,
                              @RequestParam(value = "eventDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date eventDate,
                              @RequestParam(value = "summ") long summ) {

        Event event = new Event(eventName, eventDate, summ);
        event.setIsActive(false);


        eventService.createEvent(event);
        return "inserted";
    }


    //-----------------------------------------------------------
    // UserPayments managment

    @RequestMapping(value = "/userPayments/{userId}", method = RequestMethod.GET)
    public String userPayments(@PathVariable int userId, Model model) {
        String userName = userService.getUserById(userId).getName();
        model.addAttribute("userName", userName);
        return "userPayments";
    }

    @RequestMapping(value = "/addPayment", method = RequestMethod.GET)
    @ResponseBody
    public String addPayment(@RequestParam(value = "summ") long summ,
                             @RequestParam(value = "paymentDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date paymentDate,
                             @RequestParam(value = "userId") int userId) {

        UserPayments userPayment = new UserPayments(userId, paymentDate, summ);
        userService.updateUser(userId, userPayment);
        return "Платеж добавлен";
    }


    @RequestMapping(value = "/deletePayment", method = RequestMethod.GET)
    @ResponseBody
    public String deletePayment(@RequestParam(value = "paymentId") int paymentId,
                                @RequestParam(value = "userId") int userId) {
        userService.deletePayment(paymentId, userId);
        return "Платеж удален";
    }

    // Events management
    @RequestMapping(value = "/event", method = RequestMethod.GET)
    public String eventList() {
        return "event";
    }


    @RequestMapping(value = "/addEvent", method = RequestMethod.GET)
    @ResponseBody
    public String addEvent(@RequestParam(value = "eventName") String eventName,
                           @RequestParam(value = "eventDate") String eventDate,
                           @RequestParam(value = "summ") long summ) throws ParseException {


        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = df.parse(eventDate);

        Event event = new Event(eventName, date, summ);
        event.setIsActive(false);

//		List<Integer> inActiveUserId= userService.allUsers()
//				                                      .stream()
//				                                      .filter(user -> !user.getIsActive())
//				                                      .map(User::getId)
//				                                      .collect(toList());


        eventService.createEvent(event);
        return "Событие добавлено";
    }


    @RequestMapping(value = "/deleteEvent", method = RequestMethod.GET)
    @ResponseBody
    public String deleteEvent(@RequestParam(value = "eventId") int eventId) {
        eventService.deleteEvent(eventId);
        return "Событие удалено";
    }

    @RequestMapping(value = "/changeEventStatus", method = RequestMethod.GET)
    @ResponseBody
    public String changeEventStatus(@RequestParam(value = "eventId") int eventId) {
        eventService.changeEventStatus(eventId);
        return "Статус изменен";
    }

    //Users management
    @RequestMapping(value = "/userList", method = RequestMethod.GET)
    public String userList(ModelMap model) {

        return "userList";
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.GET)
    @ResponseBody
    public String addUser(@RequestParam(value = "name") String name,
                          @RequestParam(value = "password") String password,
                          @RequestParam(value = "email") String email
    ) {
        User user = new User(name, password, email);
        user.setIsActive(true);
        userService.addUser(user);
        return "Пользователь добавлен";
    }

    @RequestMapping(value = "/deletePayment", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String delPayment(@RequestParam(value = "paymentId") int paymentId,
                             @RequestParam(value = "userId") int userId) {
        userService.deletePayment(paymentId, userId);
        return "Платеж удален";
    }
    // -------------------------------------------------------------------------------


    @RequestMapping(value = "/deleteUser", method = RequestMethod.GET)
    @ResponseBody
    public String deleteUser(@RequestParam(value = "userId") int userId) {
        userService.deleteUser(userId);
        return "Пользователь удален";
    }

    @RequestMapping(value = "/changeUserStatus", method = RequestMethod.GET)
    @ResponseBody
    public String changeUserStatus(@RequestParam(value = "userId") int userId) {
        userService.changeUserStatus(userId);
        return "Статус изменен";
    }


    // ResultTable management

    @RequestMapping(value = "/resultTable", method = RequestMethod.GET)
    public String resultTable(ModelMap model) {
        return "resultTable";
    }

    @RequestMapping(value = "/getUsersInfo", method = RequestMethod.GET)
    @ResponseBody
    public Map<User, Integer> getUsersName() {
        return userService.allUsersName();
    }

    @RequestMapping(value = "/getEventsInfo", method = RequestMethod.GET)
    @ResponseBody
    public List<Event> getEventsInfo() {
        return eventService.allEvents();
    }

}