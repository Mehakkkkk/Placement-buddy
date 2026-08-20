package com.placementtracker.backend.controller;

import com.placementtracker.backend.entity.InterviewRound;
import com.placementtracker.backend.service.InterviewRoundService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews")
public class InterviewRoundController {

    private final InterviewRoundService interviewRoundService;

    public InterviewRoundController(InterviewRoundService interviewRoundService) {
        this.interviewRoundService = interviewRoundService;
    }

    @PostMapping
    public ResponseEntity<?> addRound(@AuthenticationPrincipal Integer userId, @RequestBody InterviewRound round) {
        try {
            InterviewRound saved = interviewRoundService.addRound(userId, round);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<?> getRoundsByCompany(@AuthenticationPrincipal Integer userId, @PathVariable Integer companyId) {
        try {
            List<InterviewRound> rounds = interviewRoundService.getRoundsByCompany(userId, companyId);
            return ResponseEntity.ok(rounds);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRound(@AuthenticationPrincipal Integer userId, @PathVariable Integer id, @RequestBody InterviewRound round) {
        try {
            InterviewRound updated = interviewRoundService.updateRound(userId, id, round);
            return ResponseEntity.ok(updated);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRound(@AuthenticationPrincipal Integer userId, @PathVariable Integer id) {
        try {
            interviewRoundService.deleteRound(userId, id);
            return ResponseEntity.ok(Map.of("message", "Round deleted successfully"));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
