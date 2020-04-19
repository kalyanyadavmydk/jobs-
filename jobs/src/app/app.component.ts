import { Component,OnInit } from '@angular/core';
import {NgForm,FormControl} from '@angular/forms'
import { from } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { error } from '@angular/compiler/src/util';
import { componentFactoryName } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jobs';
  selected;
  Experience
  sort
  joblist=[]
  toppings = new FormControl();
  degree: string[] = ['Btech', 'Mtech', 'MCA', 'PhD'];
  constructor(private http:HttpClient){

  }
  ngOnInit(){
    this.joblist=[]
    this.http.get<any>('http://localhost:3000/get/jobs').subscribe((data)=>{
      console.log(data)
      for (let i of data){
        var logo=encodeURI("https://logo.clearbit.com/"+i.company+".com")
        //console.log(i.degree,i.company)
        var url=encodeURI(i.link)
        this.joblist.push([
          i._id,
          i.company,
          i.website,
          i.role,
          i.experience,
          i.location,
          i.batch,
          i.degree,
          url,
          logo
        ])
        console.log(encodeURI(i.link))
      }
      console.log(this.joblist)
    })
  }
  formsubmit(form){
    if(form.invalid){
      return new alert("fill all the details");
    }
      var array={
        company:form.value.company,
        website:form.value.website,
        role:form.value.role,
        experience:this.Experience,
        location:form.value.location,
        batch:form.value.batch,
        degree:this.toppings.value,
        applylink:form.value.link,
        deadline:form.value.date
      }
      
      console.log(form.value)
      this.http.post<any>("http://localhost:3000/create/jobs",array).subscribe((data)=>{
        console.log(data)
      })
      
  }

  deletejob(id){
    var params={id:id}
    this.http.delete<any>('http://localhost:3000/delete/job',{params}).subscribe((data)=>{
      return new alert("job successfully deleted, Reload the page")
    })
  }
  sortjob(sort){
    console.log(sort,454)
  var params={experience:sort}
  this.joblist=[]
  this.http.get<any>('http://localhost:3000/sort/job',{params}).subscribe((data)=>{
    console.log(data)
    for (let i of data){
      var logo=encodeURI("https://logo.clearbit.com/"+i.company+".com")
      console.log(logo)
      var url=encodeURI(i.link)
      this.joblist.push([
        i._id,
        i.company,
        i.website,
        i.role,
        i.experience,
        i.location,
        i.batch,
        i.degree,
        url,
        logo
      ])
      console.log(encodeURI(i.link))
    }
  })
  }
}
