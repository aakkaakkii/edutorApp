create sequence hibernate_sequence start 1 increment 1;

create table user_role
(
    user_id int8 not null,
    roles   varchar(255)
);

create table user_log
(
    id        int8 not null,
    action    varchar(255),
    date      timestamp,
    message   varchar(2048),
    user_name varchar(255),
    user_id   int8,
    primary key (id)
);

create table user_tasks
(
    id      int8 not null,
    tasks   int4 not null,
    user_id int8,
    primary key (id)
);

create table usr
(
    id       int8         not null,
    active   boolean      not null,
    mail     varchar(255),
    password varchar(255) not null,
    username varchar(255) not null,
    primary key (id)
);

alter table if exists user_role
    add constraint role_user_fk foreign key (user_id) references usr;
alter table if exists user_log
    add constraint log_user_fk foreign key (user_id) references usr;
alter table if exists user_tasks
    add constraint task_role_fk foreign key (user_id) references usr;
