package springapp.service;


import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import springapp.pojo.Event;
import springapp.pojo.User;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


class XMLBuilderImpl implements XMLBuilder {
    private Document doc;


    public XMLBuilderImpl() {
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            doc = docBuilder.newDocument();
        } catch (ParserConfigurationException ex) {
            ex.printStackTrace();
        }
    }


    @Override
    public String buildXML(Map<Event, Map<User, Long>> resultTable, String file) {
        List<User> userList = new ArrayList<>();
        Map<User, Long> userSumMap = resultTable.entrySet().iterator().next().getValue();
        userSumMap.forEach((x, y) -> userList.add(x));


        // root elements
        Element rootElement = doc.createElement("rows");
        doc.appendChild(rootElement);

        //head element
        Element head = doc.createElement("head");
        rootElement.appendChild(head);


        //headers column element
        Element headColumn = doc.createElement("column");
        headColumn.appendChild(doc.createTextNode("Name"));
        headColumn.setAttribute("id", "name");
        headColumn.setAttribute("width", "250");
        headColumn.setAttribute("type", "co");
        headColumn.setAttribute("align", "left");
        headColumn.setAttribute("sort", "str");
        head.appendChild(headColumn);

        //row element - user name
        for (User user : userList) {
            Element row = doc.createElement("row");
            row.setAttribute("id", String.valueOf(user.getId()));
            rootElement.appendChild(row);


            Element cell = doc.createElement("cell");
            cell.appendChild(doc.createTextNode(user.getName()));
            row.appendChild(cell);

            System.out.println(row.toString() + " " + row.getAttribute("id") + " " + row.getFirstChild().getFirstChild().toString());

        }

        for (Map.Entry<Event, Map<User, Long>> entry : resultTable.entrySet()) {
            Event event = entry.getKey();
            userSumMap = entry.getValue(); /*Map<User,Long>*/

            String eventInfo = event.getEventName() + ": Сумма" + event.getSumm();

            headColumn = doc.createElement("column");
            headColumn.appendChild(doc.createTextNode(eventInfo));
            //headColumn.setAttribute("id", "name");
            //headColumn.setAttribute("width","50");
            headColumn.setAttribute("type", "co");
            headColumn.setAttribute("align", "right");
            headColumn.setAttribute("sort", "str");
            head.appendChild(headColumn);

            for (Map.Entry<User, Long> entry2 : userSumMap.entrySet()) {
                String userId = String.valueOf(entry2.getKey().getId());
                Long sum = entry2.getValue();


                NodeList elementtList = rootElement.getElementsByTagName("row");
                for (int i = 0; i < elementtList.getLength(); i++) {
                    Element row = (Element) elementtList.item(i);
                    if (row.getAttribute("id").equals(userId)) {
                        Element cell = doc.createElement("cell");
                        cell.appendChild(doc.createTextNode(String.valueOf(sum)));
                        row.appendChild(cell);
                        break;
                    }
                }


            }
        }
        String response = new String();
        try {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StringWriter writer = new StringWriter();
            //StreamResult result = new StreamResult(writer);

            StreamResult result = new StreamResult(new File(file));
            transformer.transform(source, result);
            response = writer.toString();
            System.out.println("XML is ready");
        } catch (TransformerException ex) {
            ex.printStackTrace();
        }

        return response;
    }
}
