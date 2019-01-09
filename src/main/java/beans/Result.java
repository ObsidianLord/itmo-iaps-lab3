package beans;

import services.ResultService;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.context.FacesContext;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@ManagedBean
@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String session_id;

    @NotNull
    private double x;

    @NotNull
    private double y;

    @NotNull
    private double r;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    private Date result_date;

    @NotNull
    private int correct;

    @ManagedProperty(value = "#{eclipseService}")
    @Transient
    private ResultService service;

    public Result() {r = 5.0;}

    public Result(@NotNull String session_id, @NotNull double x, @NotNull double y, @NotNull double r, @NotNull Date date, @NotNull int correct) {
        this.session_id = session_id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.result_date = date;
        this.correct = correct;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public Date getResult_date() {
        return result_date;
    }

    public void setResult_date(Date result_date) {
        this.result_date = result_date;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public ResultService getService() {
        return service;
    }

    public void setService(ResultService service) {
        this.service = service;
    }

    private boolean checkArea(double x, double y, double r) {
        if (x <= 0) {
            if ((x >= -r) && (y >= 0) && (y <= r/2.)) return true;
            return (y <= 0) && ((x * x + y * y) <= r * r / 4.);
        } else return (y >= 0) && (y <= r / 2. - x);
    }

    public void check() {
        if ((x >= -5) && (x <= 1) && (y >= -3) && (y <= 3) && (r >= 2) && (r <= 5)) {
            correct = checkArea(x, y, r) ? 1 : 0;
            result_date = new Date();
            session_id = FacesContext.getCurrentInstance().getExternalContext().getSessionId(false);
            service.save(this);
        }
    }


}
