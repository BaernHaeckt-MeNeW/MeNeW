package ch.bernhackt.menew.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String mealTime;

    @Column(nullable = false)
    private LocalDate plannedMealDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMealTime() {
        return mealTime;
    }

    public void setMealTime(String mealTime) {
        this.mealTime = mealTime;
    }

    public LocalDate getPlannedMealDate() {
        return plannedMealDate;
    }

    public void setPlannedMealDate(LocalDate plannedMealDate) {
        this.plannedMealDate = plannedMealDate;
    }
}

