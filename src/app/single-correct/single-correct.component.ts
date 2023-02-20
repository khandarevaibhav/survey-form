import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-single-correct',
  templateUrl: './single-correct.component.html',
  styleUrls: ['./single-correct.component.scss'],
})
export class SingleCorrectComponent {
  
  questionControl = new FormControl('');

  constructor(public fb:FormBuilder){}

  // multipleChoice = this.fb.group({
  //   multipleArray : this.fb.array([
  //     mc_question : [''],
  //     mc_answer : this.fb.array([
  //       this.fb.control('')
  //     ])
  //   ])
  // })

  public root : any[]=[];

  multipleChioce = this.fb.group({
      question : [''],
      option : this.fb.array([
        this.fb.control('')
      ])
  })

  // onCheckboxChange(index: number) {
  //   this.checkboxes[index - 1] = !this.checkboxes[index - 1];
  // }

  // @Output() valueEvent = new EventEmitter<void>();

  getValue() {
    // console.log(`multiple correct: ${this.checkboxes}`);
    // this.valueEvent.emit();
    // return this.checkboxes;
    const result = this.multipleChioce.value
    console.log(result);
  this.root.push(result)
    return result;
  }

  get options()
  {
    return this.multipleChioce.get('option') as FormArray;
  }

  addNewOptions(){
    this.options.push(this.fb.control(''));
  }

  removeOption()
  {
    this.options.removeAt(this.options.length-1);
  }
}
