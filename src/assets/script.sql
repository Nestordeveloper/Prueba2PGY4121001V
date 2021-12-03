CREATE TABLE IF NOT EXISTS alumno(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT(15),
    apellido TEXT(15),
    sapellido TEXT(15),
    nacionalidad TEXT(15),
    edad INTEGER(2),
    direccion TEXT(30),
    comuna TEXT,
    tutor TEXT(20),
    img TEXT
);


INSERT OR IGNORE INTO alumno (id, nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img) VALUES (1, 'Carlitos', 'Baldosa', 'Rodriguez', 'Chilena', '15', 'Las Compuertas 210', 'San Miguel', 'Chas Finster', 'https://i2.wp.com/cinicosdesinope.com/wp-content/uploads/2015/09/carlitos-rugrats-crecidos-personaje.jpg');
INSERT OR IGNORE INTO alumno (id, nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img) VALUES (2, 'Tommy', 'Pickles', 'Gonzalez', 'Chilena', '15', 'Las Velas 170', 'San Miguel', 'Hugo Pickles', 'https://pbs.twimg.com/profile_images/1064591798310510592/kUhQvwKM_400x400.jpg');
INSERT OR IGNORE INTO alumno (id, nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img) VALUES (3, 'Angelica', 'Pickles', 'Perez', 'Chilena', '17', 'Padre Baldo Santi 360', 'Vitacura', 'Carlota Pickles', 'https://i2.wp.com/cinicosdesinope.com/wp-content/uploads/2015/09/angelica-rugrats-crecidos-personaje.jpg');
INSERT OR IGNORE INTO alumno (id, nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img) VALUES (4, 'Liliana', 'Deville', 'Rojas', 'Chilena', '15', 'Aguas Claras 120', 'La Cisterna', 'Betty Deville', 'https://i1.wp.com/cinicosdesinope.com/wp-content/uploads/2015/09/lili-rugrats-crecidos.png');
INSERT OR IGNORE INTO alumno (id, nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img) VALUES (5, 'Filiberto', 'Deville', 'Rojas', 'Chilena', '15', 'Aguas Claras 120', 'La Cisterna', 'Betty Deville', 'https://i0.wp.com/cinicosdesinope.com/wp-content/uploads/2015/09/fili-rugrats-crecidos.png');