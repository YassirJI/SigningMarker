import { Component, OnInit, Input} from '@angular/core';
import { SignHereTab} from './signHereTab';

import * as $ from 'jquery';
@Component({
  selector: 'app-document-signing-creation',
  templateUrl: './document-signing-creation.component.html',
  styleUrls: ['./document-signing-creation.component.css'],
})
export class DocumentSigningCreationComponent implements OnInit {
  fileSource:String;

  private draggedItem:Element;
  private offsetX:number;
  private offsetY:number;
  
  constructor() { }

  ngOnInit() {
  }

  onDrag(draggEvent:DragEvent):void{
    this.draggedItem=draggEvent.srcElement;
  //  console.log(draggEvent.srcElement);
  }

  onDragEnter(draggEvent:DragEvent):void {

  }

  onDragleave(draggEvent:Event):void {
  }

  onDrop(draggEvent:DragEvent):void{
    let element=$(this.draggedItem);

    if(element.hasClass("origin")){
      this.addDraggedItemToDropZone(this, element);
      this.disableDraggableItem();

    }else{
      this.changeDraggedPosition(element);
    }
  }

  addDraggedItemToDropZone(jThis : any, element : any) : void {
      let newElement = element.clone(true,true);
      newElement.bind("dragstart", function(event) {
        return jThis.onDrag(<DragEvent>event.originalEvent);
      });
      newElement.removeClass("origin");
      newElement.css({position:'absolute',width:'250px'});
      newElement.css({top:this.offsetY.valueOf(), left:this.offsetX.valueOf()});
      $(".dropZone").append(newElement);
      
  }

  disableDraggableItem() : void {
    this.draggedItem.setAttribute("disabled","disabled");
    this.draggedItem.removeAttribute("draggable");
  }

  changeDraggedPosition(element:any){
     element.css({top:this.offsetY.valueOf(),left:this.offsetX.valueOf()});
  }

  onDragOver(draggEvent:DragEvent):void{
      draggEvent.preventDefault();
      this.offsetX=draggEvent.offsetX;
      this.offsetY=draggEvent.offsetY;
  }

  onDragEnd(draggEvent:DragEvent):void{
      draggEvent.preventDefault();
      this.offsetX=draggEvent.offsetX;
      this.offsetY=draggEvent.offsetY; 
      
      console.log("dragEnd", draggEvent.srcElement, this.offsetX, this.offsetY);
  }

  onSubmit() : void {
      let signHereTab : SignHereTab = {
          'xPosition' : this.offsetX,
          'yPosition' : this.offsetY,
          'documentId': 1,
          'pageNumber': 1
      }
      
      console.log(signHereTab);
  }

  public fileSourceChanged(event:Event):void{
    this.fileSource=event.srcElement.nodeValue;
    console.log(event.type);
    let input =<HTMLInputElement> document.getElementById('fileinput');
        if (!input) {
            console.log("p", "Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            console.log("p", "This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            console.log("p", "Please select a file before clicking 'Load'");
        }//else if (/\.(jpe?g|png|gif)$/i.test(file.name)!input.files[0]) {

        else{
          var reader  = new FileReader();
          let jThis=this;
          reader.addEventListener("load", function () {
            jThis.fileSource = reader.result;
          }, false);
          
          if (input.files[0]) {
            reader.readAsDataURL(input.files[0]);
          }
        }
        
  }

}
