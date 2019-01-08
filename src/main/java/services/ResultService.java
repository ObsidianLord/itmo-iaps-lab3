package services;

import beans.Result;

import javax.persistence.EntityManager;
import java.util.List;

public interface ResultService {
    List getAllResults();
    EntityManager getEntityManager();
    void save(Result result);
    void clean();
}
