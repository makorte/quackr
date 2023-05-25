package de.maxkorte.quackrbackend.rest.exceptions;

import jakarta.persistence.NoResultException;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Objects;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = NoResultException.class)
    protected ResponseEntity<Object> handleNoResultException(NoResultException exception, WebRequest request) {
        return handleExceptionInternal(exception, null, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = PSQLException.class)
    protected ResponseEntity<Object> handlePSQLException(PSQLException exception, WebRequest request) {
        if(Objects.equals(Objects.requireNonNull(exception.getServerErrorMessage()).getConstraint(), "uk_cn0lapo463cu9iquvhgmc8iql")) {
            return handleExceptionInternal(exception, "User with this username already exists", new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
        }
        return handleExceptionInternal(exception, "SQL Exception", new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
