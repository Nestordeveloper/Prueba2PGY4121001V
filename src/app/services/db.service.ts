import { HttpClient } from '@angular/common/http';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  alumnoList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlporter: SQLitePorter) { 
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'alumno.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
      });
    }

    dbState() {
      return this.isDbReady.asObservable();
    }

    fetchAlumnos(): Observable<Alumno[]> {
      return this.alumnoList.asObservable();
    }

    getFakeData() {
      this.httpClient.get(
        'assets/script.sql',{responseType: 'text'}
      ).subscribe(data => {
        this.sqlporter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getAlumnos();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }


    //Obtener la lista de alumnos
    getAlumnos(){
      return this.storage.executeSql('SELECT * FROM alumno',[]).then(res => {
        let items: Alumno[] = [];
        if(res.rows.length > 0)
        {
          for(var i=0; i < res.rows.length; i++)
          {
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              apellido: res.rows.item(i).apellido,
              sapellido: res.rows.item(i).sapellido,
              nacionalidad: res.rows.item(i).nacionalidad,
              edad: res.rows.item(i).edad,
              direccion: res.rows.item(i).direccion,
              comuna: res.rows.item(i).comuna,
              tutor: res.rows.item(i).tutor,
              img: res.rows.item(i).img
            });
          }
        }
        this.alumnoList.next(items);
      });
    }

    //agregar objetos a la bd
    addAlumno(nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img){
      let data =[nombre, apellido, sapellido, nacionalidad, edad, direccion, comuna, tutor, img];
      return this.storage.executeSql('INSERT INTO alumno (NOMBRE, APELLIDO, SAPELLIDO, NACIONALIDAD, EDAD, DIRECCION, COMUNA, TUTOR, IMG) VALUES (?,?,?,?,?,?,?,?,?)',data)
      .then(res => {
        this.getAlumnos();
      });
    }

    getAlumno(id): Promise<Alumno> {
      return this.storage.executeSql('SELECT * FROM alumno WHERE ID = ?',[id])
      .then(res => {
        return {
          id: res.rows.item(0).id,
              nombre: res.rows.item(0).nombre,
              apellido: res.rows.item(0).apellido,
              sapellido: res.rows.item(0).sapellido,
              nacionalidad: res.rows.item(0).nacionalidad,
              edad: res.rows.item(0).edad,
              direccion: res.rows.item(0).direccion,
              comuna: res.rows.item(0).comuna,
              tutor: res.rows.item(0).tutor,
              img: res.rows.item(0).img
        }
      });
    }

    //actualizar
    updateAlumno(id, alumno:Alumno){
      let data = [alumno.nombre, alumno.apellido, alumno.sapellido, alumno.nacionalidad, alumno.edad, alumno.direccion, alumno.comuna, alumno.tutor, alumno.img];
      return this.storage.executeSql(`UPDATE alumno SET nombre = ?, apellido = ?, sapellido = ?, nacionalidad = ?, edad = ?, direccion = ?, comuna = ?, tutor = ?, img = ? WHERE id = ${id}`,data)
      .then(_ => {
        this.getAlumnos();
      });
    }

    //eliminar
    deleteAlumno(id) {
      return this.storage.executeSql('DELETE FROM alumno WHERE id=?',[id])
      .then(_ => {
        this.getAlumnos()
      });
    }
       
    
}

