import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
    @ViewChild('myModal') model:ElementRef | undefined;
    studentObj:studentModel= new studentModel();
    studentList : studentModel[] = [];

    ngOnInit():void{
      this.getStudentList();
    }

    openModel(){
      const sdtmodel = document.getElementById('myModal');
      if (sdtmodel != null){
        sdtmodel.style.display='block';
      }
    }

    closeModel(){
      if (this.model != null){
        this.model.nativeElement.style.display='none';        
      }
    }

    onSaveform(){
      console.log(this.studentObj)
      const localData=localStorage.getItem('studentData')
      if (localData!=null){
        const sdtData=JSON.parse(localData)
        this.studentObj.id=sdtData.length+1
        sdtData.push(this.studentObj)
        localStorage.setItem('studentData',JSON.stringify(sdtData))

      }
      else{
        const newStudent=[];
        newStudent.push(this.studentObj)
        this.studentObj.id=1;
        localStorage.setItem('studentData',JSON.stringify(newStudent))
      }
      this.closeModel()
      this.getStudentList()

    }
    
    onEditStudent(studentData : studentModel){
      this.studentObj = studentData;
      this.openModel()
    }

    getStudentList(){
      const localData= localStorage.getItem('studentData')
      if (localData!=null){
        this.studentList=JSON.parse(localData)
      }
    }
    onUpdateform(){
      const currentStudent=this.studentList.find(s=>s.id === this.studentObj.id)
      if (currentStudent != undefined){
          currentStudent.name = this.studentObj.name
          currentStudent.mobile = this.studentObj.mobile
          currentStudent.email = this.studentObj.email
          currentStudent.gender = this.studentObj.gender
          currentStudent.dob  = this.studentObj.dob
          currentStudent.address =this.studentObj.address
          currentStudent.status = this.studentObj.status

      }
      localStorage.setItem('studentData',JSON.stringify(this.studentList))
      this.closeModel()
    }



    onDeleteStudent(){
      const isConfirm = confirm("Are you sure you want to delete this student?.....")
      if (isConfirm){
        const currentStudent=this.studentList.findIndex(s=>s.id === this.studentObj.id)
        this.studentList.splice(currentStudent, 1)
        localStorage.setItem('studentData',JSON.stringify(this.studentList))

        

      }

    }

}


export class studentModel{
  id:number;
  name: string;
  mobile:string;
  email:string;
  gender:string;
  dob:string;
  address:string;
  status:boolean;
  
  constructor(){
    this.id=0;
    this.name='';
    this.mobile='';
    this.email='';
    this.gender='';
    this.dob='';
    this.address='';
    this.status=false;
  }
}