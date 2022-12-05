export interface dataType {
    id:number,
    text:string,
    title:string
};

export interface NewNoteProps {
    db: dataType[],
    setDB:Function,
    newId:number,
    hashTags:Array<string>
};