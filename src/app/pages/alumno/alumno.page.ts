import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  editForm : FormGroup;
  id : any;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getAlumno(this.id).then(res => {
      this.editForm.setValue({
        nombre: res['nombre'],
        apellido: res['apellido'],
        sapellido: res['sapellido'],
        nacionalidad: res['nacionalidad'],
        edad: res['edad'],
        direccion: res['direccion'],
        comuna: res['comuna'],
        tutor: res['tutor'],
        img: res['img']
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      sapellido: [''],
      nacionalidad: [''],
      edad: [''],
      direccion: [''],
      comuna: [''],
      tutor: [''],
      img: ['']
    });
  }

  updateAlumno() {
    this.db.updateAlumno(this.id, this.editForm.value).then((res) => {
      console.log(res)
      this.router.navigate(['/home']);
    });
  }

}