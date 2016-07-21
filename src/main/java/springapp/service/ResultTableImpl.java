package springapp.service;

import springapp.pojo.Event;
import springapp.pojo.InactiveUsers;
import springapp.pojo.User;
import springapp.pojo.UserPayments;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import static java.util.stream.Collectors.toMap;

/**
 * Created by stail on 03.05.2016.
 */
public class ResultTableImpl implements ResultTable {
    private List<Event> eventList;
    private List<User> userList;
    private XMLBuilder xmlBuilder;

    public ResultTableImpl(List<Event> eventList, List<User> userList) {
        this.eventList = eventList;
        this.userList = userList;
        xmlBuilder = new XMLBuilderImpl();
    }

    @Override
    public String createReusltTable(String file) {
        Function<Event, Map<User, Long>> createMap = new Function<Event, Map<User, Long>>() {
            @Override
            public Map<User, Long> apply(Event event) {
                return new HashMap<User, Long>();
            }
        };

        Function<User, Long> getBalance = new Function<User, Long>() {
            @Override
            public Long apply(User user) {
                List<UserPayments> userPaymentses = user.getUserPayments();
                Long balance = userPaymentses.stream()
                        .mapToLong(x -> x.getSumm())
                        .reduce(0, (sum, e) -> sum + e);
                return balance;
            }
        };

        Map<User, Long> userBalance = userList.stream()
                .collect(toMap(Function.identity(), getBalance));

        Map<Event, Map<User, Long>> resultTable = eventList.stream()
                .collect(toMap(Function.identity(), createMap));


        for (Map.Entry<Event, Map<User, Long>> entry : resultTable.entrySet()) {
            Event event = entry.getKey();
            long sum = event.getSumm();
            List<InactiveUsers> activeUsers = event.getInactiveUsers();
            Map<User, Long> userLongMap = entry.getValue();

            userBalance.forEach((user, balance) -> {
                boolean isActive = activeUsers.stream()
                        .anyMatch(x -> x.getUserId() == user.getId());
                if (isActive) {
                    if (balance > 0 && balance >= sum) {
                        userLongMap.put(user, sum);
                        balance = balance - sum;
                    } else {
                        if (balance > 0) {
                            userLongMap.put(user, balance);
                            balance -= balance;
                        } else {
                            if (balance <= 0) {
                                userLongMap.put(user, 0L);
                            }
                        }
                    }
                } else {
                    userLongMap.put(user, 0L);
                }
            });

        }

        String xml = xmlBuilder.buildXML(resultTable, file);
        return xml;
    }


}
