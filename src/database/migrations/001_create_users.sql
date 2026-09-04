CREATE TABLE users (
                       id CHAR(36) NOT NULL DEFAULT (UUID()),
                       email VARCHAR(255) NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                       PRIMARY KEY (id),
                       UNIQUE KEY uq_users_email (email)
);