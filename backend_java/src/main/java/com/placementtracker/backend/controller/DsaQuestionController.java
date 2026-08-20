package com.placementtracker.backend.controller;

import com.placementtracker.backend.entity.DsaQuestion;
import com.placementtracker.backend.service.DsaQuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dsa")
public class DsaQuestionController {

    private final DsaQuestionService dsaQuestionService;

    public DsaQuestionController(DsaQuestionService dsaQuestionService) {
        this.dsaQuestionService = dsaQuestionService;
    }

    @PostMapping
    public ResponseEntity<?> addQuestion(@AuthenticationPrincipal Integer userId, @RequestBody DsaQuestion question) {
        DsaQuestion saved = dsaQuestionService.addQuestion(userId, question);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<DsaQuestion>> getQuestions(
            @AuthenticationPrincipal Integer userId,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(dsaQuestionService.getQuestions(userId, topic, difficulty, status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(@AuthenticationPrincipal Integer userId, @PathVariable Integer id, @RequestBody DsaQuestion question) {
        try {
            DsaQuestion updated = dsaQuestionService.updateQuestion(userId, id, question);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(@AuthenticationPrincipal Integer userId, @PathVariable Integer id) {
        try {
            dsaQuestionService.deleteQuestion(userId, id);
            return ResponseEntity.ok(Map.of("message", "Question deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
