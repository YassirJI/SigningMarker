import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { Tab} from './tab';

import * as $ from 'jquery';
import SignaturePad from 'signature_pad';
import * as html2canvas from "html2canvas";

@Component({
  selector: 'app-document-signing-creation',
  templateUrl: './document-signing-creation.component1.html',
  styleUrls: ['./document-signing-creation.component.css'],
})
export class DocumentSigningCreationComponent implements OnInit, AfterViewInit {
  fileSource:String;

  private draggedItem:Element;
  private offsetX:number;
  private offsetY:number;
  
  private signHereIncrement:number = 1;
  private activeSignatureTagId:string;
  private activeTypedSignerName:string = "Yassir Janati";
  
  private signaturePad:SignaturePad;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var signCanvas = document.querySelector("#signature-pad");
    this.signaturePad = new SignaturePad(signCanvas, {backgroundColor: 'rgba(255, 255, 255, 0)', penColor: 'rgb(0, 0, 0)'});
  }

  saveSignature():void {

    let image;
    let jThis = this;

    if($("#drawIt").is(".active")){
        image = this.signaturePad.toDataURL('image/png');
        jThis.updatePeronalizedSignatureTag(jThis, image);
    } else {
        html2canvas(document.querySelector("#divtypeName")).then(function(canvas) {
            image = canvas.toDataURL('image/png');
            jThis.updatePeronalizedSignatureTag(jThis, image);
            });
    }
  }

  updatePeronalizedSignatureTag(jThis, image):void {
          let tagDivElement = $("#" + this.activeSignatureTagId + "");
          tagDivElement.css('background-image', 'url("' + image + '")');
          tagDivElement.css('background-color', 'white'); 
          tagDivElement.width(180);
          tagDivElement.height(60);   
  }

  clearCanvasSignature():void {
    this.signaturePad.clear();
  }

  onDrag(draggEvent:DragEvent):void{
    this.draggedItem=draggEvent.srcElement;
  //  console.log(draggEvent.srcElement);
  }

  onDragEnter(draggEvent:DragEvent):void {

  }

  onDragleave(draggEvent:Event):void {
  }

  onDragOver(draggEvent:DragEvent):void{
      draggEvent.preventDefault();
      this.offsetX=draggEvent.offsetX;
      this.offsetY=draggEvent.offsetY;
  }

  onDragEnd(draggEvent:DragEvent):void{
  }

  onDrop(draggEvent:DragEvent):void{
    let element=$(this.draggedItem);

    if(element.hasClass("tool-button")){
      this.addDraggedItemToDropZone2(this, element, draggEvent);
      //this.disableDraggableItem();

    }else{
      this.changeDraggedPosition(element);
    }
  }


   addDraggedItemToDropZone2(jThis : any, element : any, draggEvent:DragEvent) : void {
       var offsetXPos = draggEvent.offsetX ;
       var offsetYPos = draggEvent.offsetY ;
       
       let newElement;
       if (element.hasClass("signature-tool")) {
          newElement =  $("<div draggable='true' data-toggle='modal' data-target='#signatureModal' class='signerTag signHereTag draggable' id='signTagDiv"+this.signHereIncrement+"' signTagId='"+this.signHereIncrement+"' recipientId='0'  order='0' tagtype='signHere' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../assets/sign_here.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
          let jThis = this;
          newElement.click(function (evt) {
              jThis.activeSignatureTagId = this.id;
              jThis.clearCanvasSignature();
          });
          this.signHereIncrement++;
       }
       else if (element.hasClass("text-tool")) {
          newElement = $("<div draggable='true' class='signerTag nameHereTag draggable' recipientId='0'  order='0' tagtype='text' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px; background-image:url(../../assets/text.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
       }
       else if (element.hasClass("date-tool")) {
          newElement =  $("<div draggable='true' class='signerTag nameHereTag draggable' recipientId='0'  order='0' tagtype='dateSigned' tagcolor='tagTopYellow' style='position: absolute; left:" + offsetXPos + "px; top:" + offsetYPos + "px;background-image:url(../../assets/signed_date.png);background-repeat:no-repeat;background-position:center;background-size: contain;height:35px;width:160px;background-color: antiquewhite;cursor: move; border: 1px solid #BEBEBE; margin: 0 5px 10px 0;' clonedtag='yes' id='dragTagDiv'></div>");
       }
       newElement.bind("dragstart", function(event) {
         return jThis.onDrag(<DragEvent>event.originalEvent);
       });
       $(".dropZone").append(newElement);
   
        console.log(newElement);
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

  saveSign() : void {
        let signerTabs : Tab[] = [] ; 
        $(".signerTag").each(function () {
                    var element = $(this);
                    signerTabs.push(
                    {
                          'xPosition' : element.css("left"),
                          'yPosition' : element.css("top"),
                          'documentId': 1,
                          'pageNumber': 1,
                          'recipientId' : Number(element.attr("recipientId")),
                          'tabType' : element.attr("tagtype")
                          //order: element.attr("order"),
                      });
          });
      console.log(signerTabs);
  }

  public fileSourceChanged(event:Event):void{
    this.fileSource=event.srcElement.nodeValue;
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
