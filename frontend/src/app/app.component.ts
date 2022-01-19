import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judge0Angular';
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x(y) {\nreturn ("Hello world!");\n}\nprocess.stdin.on("data", data => console.log(x(data.toString())))';
  resultingCode: string = "";
  stdin: string = "" ;
  expected_stdout: string = "";
  result: string = "" ;
  supported_languages: any[] = [] ;
  selectedLanguage: string = "" ;

  constructor(private http: HttpClient){
    this.http.get(environment.apiEndpoint + 'supported_languages').subscribe((data:any)=> {this.supported_languages = data.data; this.selectedLanguage = data.data[0].id;})
  }

  submitCode() : void{
    console.log(this.selectedLanguage);
    this.resultingCode = "Running..."
    this.result = "Running..."
    this.http.post(environment.apiEndpoint + 'attempt', {source_code: btoa(this.code), langId: this.selectedLanguage, stdin: btoa(this.stdin), expected_stdout: btoa(this.expected_stdout) })
    .subscribe( (data: any) => {
      this.result = data.result;
      this.resultingCode = atob(data.debug) ;
    })
    
  }
}
