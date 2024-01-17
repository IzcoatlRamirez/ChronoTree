import { ChangeEvent, DragEvent,MutableRefObject} from "react";

export interface UploadFileForm {
    handleFileDrop : (e: DragEvent<HTMLDivElement>)=> void;
    handleButtonClick : ()=> void;
    handleFileChange : (e: ChangeEvent<HTMLInputElement>)=> void;
    handleUploadImage : ()=> void;
    fileInputRef : MutableRefObject<HTMLInputElement | null>
    imageUrl : string | undefined;
}