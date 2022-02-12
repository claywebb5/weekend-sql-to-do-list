-- Database "weekend-to-do-app" created

-- Table created
CREATE TABLE "tasks"(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (100) NOT NULL,
    "date" DATE,
    "status" BOOLEAN DEFAULT 'False'
);

-- Initial task created
INSERT INTO "tasks" ("task", "date")
VALUES ('Complete Weekend Challenge', '3/13/2021');