package com.propsync.api.controller;

import java.util.List;
import java.util.Map;

import com.propsync.api.service.CrmStore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CrmController {
    private final CrmStore store;
    public CrmController(CrmStore store) { this.store = store; }

    @PostMapping("/auth/login") public Map<String, Object> login(@RequestBody Map<String, Object> request) { return store.login(request); }
    @GetMapping("/dashboard") public Map<String, Object> dashboard() { return store.dashboard(); }
    @GetMapping("/agents") public List<Map<String, Object>> agents() { return store.getAgents(); }
    @GetMapping("/leads") public List<Map<String, Object>> leads(@RequestParam(required = false) String search, @RequestParam(required = false) String project, @RequestParam(required = false) String status, @RequestParam(required = false) String agent) { return store.getLeads(search, project, status, agent); }
    @PostMapping("/leads") public ResponseEntity<Map<String, Object>> createLead(@RequestBody Map<String, Object> request) { return ResponseEntity.status(HttpStatus.CREATED).body(store.createLead(request)); }
    @GetMapping("/leads/{id}") public ResponseEntity<Map<String, Object>> lead(@PathVariable String id) { Map<String, Object> lead = store.getLead(id); return lead == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(lead); }
    @PatchMapping("/leads/{id}") public ResponseEntity<Map<String, Object>> updateLead(@PathVariable String id, @RequestBody Map<String, Object> request) { Map<String, Object> lead = store.updateLead(id, request); return lead == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(lead); }
    @DeleteMapping("/leads/{id}") public ResponseEntity<Void> deleteLead(@PathVariable String id) { return store.deleteLead(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build(); }
    @PostMapping("/leads/{id}/merge") public ResponseEntity<Map<String, Object>> mergeLead(@PathVariable String id, @RequestBody Map<String, Object> request) { Map<String, Object> lead = store.mergeLead(id, request); return lead == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(lead); }
    @GetMapping("/leads/unassigned") public List<Map<String, Object>> unassigned() { return store.getUnassignedLeads(); }
    @PostMapping("/leads/assignments") public Map<String, Object> assign(@RequestBody Map<String, Object> request) { return store.assignLeads(request); }
    @PostMapping("/organization/team") public Map<String, Object> team(@RequestBody Map<String, Object> request) { return store.saveTeam(request); }
    @PatchMapping("/organization/work-mode") public Map<String, Object> workMode(@RequestBody Map<String, Object> request) { return store.setWorkMode(request); }
}
