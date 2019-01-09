package services;

import beans.Result;

import java.util.List;

public interface ResultService {
    List getAllResults();
    void save(Result result);
    void clean();
}
