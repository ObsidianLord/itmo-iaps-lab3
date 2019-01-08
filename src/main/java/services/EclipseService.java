package services;

import beans.Result;
import org.eclipse.persistence.jpa.PersistenceProvider;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.context.FacesContext;
import javax.persistence.*;
import java.util.HashMap;
import java.util.List;

@ManagedBean(name = "eclipseService", eager = true)
@ApplicationScoped
public class EclipseService implements ResultService {

    private EntityManagerFactory entityManagerFactory = new PersistenceProvider().createEntityManagerFactory("oracle", new HashMap());
    private EntityManager entityManager = entityManagerFactory.createEntityManager();

    public EclipseService() {}

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public EntityManagerFactory getEntityManagerFactory() {
        return entityManagerFactory;
    }

    public void setEntityManagerFactory(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public List<Result> getAllResults() {
        try {
            Query query = entityManager.createQuery("SELECT result FROM Result result WHERE result.session_id = :session");
            query.setParameter("session", FacesContext.getCurrentInstance().getExternalContext().getSessionId(false));
            return query.getResultList();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void save(Result result) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(result);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction() != null)
                entityManager.getTransaction().rollback();
        }
    }

    @Override
    public void clean() {
        try {
            entityManager.getTransaction().begin();
            entityManager.createQuery("DELETE FROM Result").executeUpdate();
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction() != null)
                entityManager.getTransaction().rollback();
        }
    }

}
