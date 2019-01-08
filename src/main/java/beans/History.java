package beans;

import services.ResultService;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.Comparator;
import java.util.List;

@ManagedBean
@SessionScoped
public class History implements Serializable {

    @ManagedProperty(value = "#{eclipseService}")
    private ResultService service;

    public History(){}

    public ResultService getService() {
        return service;
    }

    public void setService(ResultService service) {
        this.service = service;
    }

    public List<Result> getHistory() {
        List<Result> results = service.getAllResults();
        results.sort(Comparator.comparing(Result::getDate).reversed());
        return results;
    }
}
