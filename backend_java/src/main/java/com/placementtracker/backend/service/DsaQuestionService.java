package com.placementtracker.backend.service;

import com.placementtracker.backend.entity.DsaQuestion;
import com.placementtracker.backend.repository.DsaQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DsaQuestionService {

    private final DsaQuestionRepository dsaQuestionRepository;

    public DsaQuestionService(DsaQuestionRepository dsaQuestionRepository) {
        this.dsaQuestionRepository = dsaQuestionRepository;
    }

    public DsaQuestion addQuestion(Integer userId, DsaQuestion question) {
        question.setUserId(userId);
        if (question.getDifficulty() == null) {
            question.setDifficulty("Medium");
        }
        if (question.getStatus() == null) {
            question.setStatus("Not Started");
        }
        return dsaQuestionRepository.save(question);
    }

    public List<DsaQuestion> getQuestions(Integer userId, String topic, String difficulty, String status) {
        return dsaQuestionRepository.findWithFilters(userId, topic, difficulty, status);
    }

    public DsaQuestion updateQuestion(Integer userId, Integer id, DsaQuestion updatedData) {
        DsaQuestion existing = dsaQuestionRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));

        existing.setTitle(updatedData.getTitle());
        existing.setTopic(updatedData.getTopic());
        existing.setDifficulty(updatedData.getDifficulty());
        existing.setStatus(updatedData.getStatus());
        existing.setLink(updatedData.getLink());
        existing.setNotes(updatedData.getNotes());

        return dsaQuestionRepository.save(existing);
    }

    public void deleteQuestion(Integer userId, Integer id) {
        DsaQuestion existing = dsaQuestionRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        dsaQuestionRepository.delete(existing);
    }
}