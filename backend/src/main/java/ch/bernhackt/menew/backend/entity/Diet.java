package ch.bernhackt.menew.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "diets")
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    public Diet(String name) {
        this.name = name;
    }

    public Diet() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return name;
    }

    public void setLabel(String label) {
        this.name = label;
    }
}
