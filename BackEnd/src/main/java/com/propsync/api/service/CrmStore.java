package com.propsync.api.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

/** Temporary in-memory data source used while the database is not connected. */
@Service
public class CrmStore {
    private final Map<String, Map<String, Object>> leads = new LinkedHashMap<>();
    private final Map<String, Map<String, Object>> unassignedLeads = new LinkedHashMap<>();
    private final List<Map<String, Object>> agents = new ArrayList<>();
    private String workMode = "team";

    public CrmStore() {
        agents.add(item("id", "sarah-jenkins", "name", "Sarah Jenkins"));
        agents.add(item("id", "john-doe", "name", "John Doe"));
        agents.add(item("id", "alex-thompson", "name", "Alex Thompson"));

        addLead("liam-chen", "Liam Chen", "Azure", "New", "New", "Stale", "2 BHK", "$520k - $620k", "(555) 123-4567", "liam.chen@example.com", "Sarah Jenkins", "1 day ago", "2023-10-26", list("10/28/23: Called and left voicemail", "10/26/23: Saw property at Azure Heights"));
        addLead("sophia-rodriguez", "Sophia Rodriguez", "Grand", "Contacted", "Contacted", "Stale", "3 BHK", "$650k - $750k", "(555) 234-5678", "sophia.rodriguez@example.com", "Sarah Jenkins", "4 days ago", "2023-10-20", list("10/28/23: Followed up via WhatsApp", "10/26/23: Received pricing request"));
        addLead("john-adams", "John Adams", "Sork", "Follow-up", "Contacted", "Stale", "3 BHK", "$500k - $750k", "(555) 101-2000", "john.adams@example.com", "Sarah Jenkins", "1 day ago", "2023-10-26", list("10/28/23: Stage to Contacted", "10/26/23: Followed via WhatsApp"));
        addLead("closed-rossi", "Closed Rossi", "Azure", "Closed", "Booked", "Active", "1 BHK", "$400k - $500k", "(555) 345-6789", "closed.rossi@example.com", "John Doe", "1 day ago", "2023-10-22", list("10/28/23: Contract signed", "10/26/23: Site visit completed"));

        addUnassigned("liam-queue", "Liam Chen", "7/08/2020, 3:39 PM", 26, "Azure");
        addUnassigned("sarah-queue", "Sarah Jenkins", "7/09/2020, 2:53 PM", 11, "Grand");
        addUnassigned("marcy-smiler", "Marcy Smiler", "6/07/2020, 3:17 PM", 14, "Sork");
        addUnassigned("chiran-smith", "Chiran Smith", "3/08/2020, 5:54 PM", 8, "Azure");
    }

    public Map<String, Object> login(Map<String, Object> request) {
        return item("token", "test-token-" + UUID.randomUUID(), "user", item("name", "Demo Admin", "email", request.get("email")), "workMode", workMode);
    }

    public List<Map<String, Object>> getAgents() { return copyList(agents); }

    public List<Map<String, Object>> getLeads(String search, String project, String status, String agent) {
        return leads.values().stream().filter(lead -> matches(lead, search, project, status, agent)).map(this::copy).collect(Collectors.toList());
    }

    public Map<String, Object> getLead(String id) { return leads.containsKey(id) ? copy(leads.get(id)) : null; }

    public Map<String, Object> createLead(Map<String, Object> request) {
        String id = UUID.randomUUID().toString();
        String name = text(request, "name", "New Lead");
        Map<String, Object> lead = item("id", id, "name", name, "project", text(request, "project", "Unspecified"), "column", "New", "stage", "New", "status", "Active", "unit", text(request, "unit", "Not specified"), "budget", budget(request), "phone", text(request, "phone", ""), "email", text(request, "email", ""), "source", text(request, "source", "Walk-in"), "notes", text(request, "notes", ""), "assignedAgent", "Sarah Jenkins", "activity", "Just now", "created", Instant.now().toString().substring(0, 10), "recentActivity", list("Lead created"));
        leads.put(id, lead);
        return copy(lead);
    }

    public Map<String, Object> updateLead(String id, Map<String, Object> request) {
        Map<String, Object> lead = leads.get(id);
        if (lead == null) return null;
        request.forEach((key, value) -> { if (value != null && !"id".equals(key) && !"recentActivity".equals(key)) lead.put(key, value); });
        lead.put("activity", "Just updated");
        return copy(lead);
    }

    public boolean deleteLead(String id) { return leads.remove(id) != null; }

    public Map<String, Object> mergeLead(String id, Map<String, Object> request) {
        Map<String, Object> lead = leads.get(id);
        if (lead == null) return null;
        lead.put("activity", "Merged with " + text(request, "targetLeadId", "another lead"));
        return copy(lead);
    }

    public List<Map<String, Object>> getUnassignedLeads() { return copyList(new ArrayList<>(unassignedLeads.values())); }

    @SuppressWarnings("unchecked")
    public Map<String, Object> assignLeads(Map<String, Object> request) {
        Object rawAssignments = request.get("assignments");
        if (!(rawAssignments instanceof List)) return item("assigned", 0);
        int count = 0;
        for (Object raw : (List<Object>) rawAssignments) {
            if (raw instanceof Map) {
                Map<String, Object> assignment = (Map<String, Object>) raw;
                if (unassignedLeads.remove(String.valueOf(assignment.get("leadId"))) != null) count++;
            }
        }
        return item("assigned", count, "remaining", unassignedLeads.size());
    }

    public Map<String, Object> saveTeam(Map<String, Object> request) {
        Object rawAgents = request.get("agents");
        if (rawAgents instanceof List) {
            for (Object raw : (List<?>) rawAgents) if (raw != null && !raw.toString().trim().isEmpty()) agents.add(item("id", UUID.randomUUID().toString(), "name", raw.toString().trim()));
        }
        return item("agents", getAgents());
    }

    public Map<String, Object> setWorkMode(Map<String, Object> request) {
        workMode = text(request, "workMode", workMode);
        return item("workMode", workMode);
    }

    public Map<String, Object> dashboard() {
        return item(
            "stats", Arrays.asList(item("title", "Site Visits Scheduled Today", "value", "10", "visitGroup", "today", "tone", "today", "context", "Needs attention today"), item("title", "Site Visits Scheduled Tomorrow", "value", "5", "visitGroup", "tomorrow", "tone", "tomorrow", "context", "Prepare for tomorrow"), item("title", "Site Visits Scheduled Next 7 Days", "value", "55", "visitGroup", "week", "tone", "week", "context", "Upcoming this week")),
            "funnelStages", Arrays.asList(item("label", "New", "value", 300, "note", "73% to Contacted"), item("label", "Contacted", "value", 220, "note", "73% to Site Visit"), item("label", "Site Visit", "value", 110, "note", "50% to Booked"), item("label", "Negotiation", "value", 60, "note", "50% to Booked"), item("label", "Booked", "value", 30, "note", "10%")),
            "attentionRows", Arrays.asList(item("name", "Sarah Jenkins", "stage", "Contacted", "days", 12, "status", "Contacted"), item("name", "Michael Brown", "stage", "Contacted", "days", 9, "status", "Contacted"), item("name", "John Adams", "stage", "Walk-in", "days", 8, "status", "Walk-in")),
            "scheduledVisits", item("today", visits("10:30 AM", "1:00 PM", "4:30 PM"), "tomorrow", visits("Tomorrow, 11:00 AM", "Tomorrow, 3:30 PM"), "week", visits("Wednesday, 5:00 PM", "Friday, 11:30 AM", "Saturday, 2:00 PM"))
        );
    }

    private List<Map<String, Object>> visits(String... times) {
        List<Map<String, Object>> result = new ArrayList<>();
        String[] names = {"Aarav Sharma", "Meera Patel", "Rohan Desai"};
        for (int i = 0; i < times.length; i++) result.add(item("id", "visit-" + times[i], "name", names[i], "email", names[i].toLowerCase().replace(" ", ".") + "@example.com", "phone", "+91 98765 4321" + i, "flatSize", i == 1 ? "3 BHK" : "2 BHK", "notes", "Interested in a guided property walkthrough.", "profession", "Professional", "time", times[i]));
        return result;
    }

    private boolean matches(Map<String, Object> lead, String search, String project, String status, String agent) {
        String haystack = (lead.get("name") + " " + lead.get("email") + " " + lead.get("phone")).toLowerCase();
        return (search == null || search.isBlank() || haystack.contains(search.toLowerCase())) && equalsFilter(lead, "project", project) && equalsFilter(lead, "status", status) && equalsFilter(lead, "assignedAgent", agent);
    }

    private boolean equalsFilter(Map<String, Object> lead, String key, String value) { return value == null || value.isBlank() || value.equals(lead.get(key)); }
    private String budget(Map<String, Object> request) { String min = text(request, "budgetMin", ""); String max = text(request, "budgetMax", ""); return min.isBlank() && max.isBlank() ? "Not specified" : min + " - " + max; }
    private String text(Map<String, Object> map, String key, String fallback) { Object value = map.get(key); return value == null ? fallback : String.valueOf(value); }
    private void addLead(String id, String name, String project, String column, String stage, String status, String unit, String budget, String phone, String email, String agent, String activity, String created, List<String> recentActivity) { leads.put(id, item("id", id, "name", name, "project", project, "column", column, "stage", stage, "status", status, "unit", unit, "budget", budget, "phone", phone, "email", email, "assignedAgent", agent, "activity", activity, "created", created, "recentActivity", recentActivity)); }
    private void addUnassigned(String id, String name, String created, int hours, String project) { unassignedLeads.put(id, item("id", id, "name", name, "created", created, "hours", hours, "project", project)); }
    private List<String> list(String... values) { return Arrays.asList(values); }
    private Map<String, Object> copy(Map<String, Object> source) { return new LinkedHashMap<>(source); }
    private List<Map<String, Object>> copyList(List<Map<String, Object>> source) { return source.stream().map(this::copy).collect(Collectors.toList()); }
    private Map<String, Object> item(Object... values) { Map<String, Object> map = new LinkedHashMap<>(); for (int i = 0; i < values.length; i += 2) map.put(String.valueOf(values[i]), values[i + 1]); return map; }
}
