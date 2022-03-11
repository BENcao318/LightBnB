INSERT INTO users (name, email, password)
VALUES ('Ben', 'ben@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
');
INSERT INTO users (name, email, password)
VALUES ('Olivia', 'olivia@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
');
INSERT INTO users (name, email, password)
VALUES ('George', 'george@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.
');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ('1', 'Good Lamp', 'desciption', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930610, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske ', 'Quebec', 28142, true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ('2', 'Habit mix', 'desciption', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 6, 4, 6, 'Canada', '1650 Hejto Center', 'Genwezuj ', 'Newfoundland And Labrador', 445836, true);
VALUES ('3', 'Fun glad', 'desciption', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 342916, 6, 6, 4, 'Canada', '169 Nuwug Circle', 'Vutgapha ', 'Newfoundland And Labrador', 001600, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ( '2019-01-04', '2019-02-01', 2, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-05-01', '2018-05-27', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 3, 'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 3, 6, 'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 3, 2, 6, 'messages');