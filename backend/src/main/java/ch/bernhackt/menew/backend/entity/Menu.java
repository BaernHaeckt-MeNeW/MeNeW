package ch.bernhackt.menew.backend.entity;

import com.fasterxml.jackson.annotation.JsonIncude;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "menues")
public class Menu {

}
