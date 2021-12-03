import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res)
      {
        this.db.fetchAlumnos().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      sapellido: [''],
      nacionalidad: [''],
      edad: [''],
      direccion: [''],
      comuna: [''],
      tutor: [''],
      img: ['']
    })
  }

  storeData(){
    this.db.addAlumno(
      this.mainForm.value.nombre,
      this.mainForm.value.apellido,
      this.mainForm.value.sapellido,
      this.mainForm.value.nacionalidad,
      this.mainForm.value.edad,
      this.mainForm.value.direccion,
      this.mainForm.value.comuna,
      this.mainForm.value.tutor,
      this.mainForm.value.img
    ).then((res) => {
      this.mainForm.reset();
    });
  }

  deleteAlumno(id){
    this.db.deleteAlumno(id).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Alumno eliminado',
        duration: 3000
      });
      toast.present()
    });
  }

}
